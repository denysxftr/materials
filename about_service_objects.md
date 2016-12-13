# Service objects

Problem:

```ruby
  def create
    @user = User.create(user_params)
    if @user.persisted?
      @car = Car.create(car_params.merge(user_id: @user.id))
      redirect_to some_welcome_path if @car.persisted?
      return
    end

    render :new
  end
```

---

```ruby
  def create
    create_user
    create_car

    if @user.valid? && @car.valid?
      redirect_to some_welcome_path
    else
      render :new
    end
  end

  private

  def create_user
    @user = User.create(user_params)
  end

  def create_car
    @car = Car.new unless @user.valid?
    @car = Car.create(car_params.merge(user_id: @user.id))
  end
```

---

<img src="img/about_service_objects/monolitic_vs_microservices.jpg" height="500px;">

---

# Service object take 1

```ruby
# app/services/registration_service.rb

class RegistrationService
  attr_reader :user, :car

  def initialize(params)
    @params = params
  end

  def perform
    @user = User.create(user_params)
    if @user.persisted?
      @car = Car.create(car_params)
      return true if @car.valid?
    end
    false
  end

  private

  def user_params
    @params.require(:user).permit(...)
  end

  def car_params
    @params.require(:car).permit(...).merge(user_id: @user)
  end
end

# app/controllers/users_controller.rb

def create
  @service = RegistrationService.new(params)
  if @service.perform
    redirect_to some_welcome_path
  else
    render :new
  end
end
```

---

# Service object take 2

```ruby
class RegistrationService
  attr_reader :user, :car

  def initialize(params)
    @params = params
  end

  def perform
    create_user && create_car && send_notifications
  end

  private

  def create_user
    @user = User.create(user_params)
    @user.persisted?
  end

  def create_car
    @car = Car.create(car_params)
    @car.persisted?
  end

  def send_notifications
    UserMailer.welcome(@user).deliver_later
  end

  def user_params
    @params.require(:user).permit(...)
  end

  def car_params
    @params.require(:car).permit(...).merge(user_id: @user)
  end
end
```

---

# Service object take 3

```ruby
# frozen_string_literal: true
class ApplicationService
  attr_reader :user, :errors

  def self.call(*arguments)
    new(*arguments).tap(&:perform)
  end

  def perform
    ActiveRecord::Base.transaction do
      return true if executing

      errors[:service] << 'unknown error' if errors.empty?
      raise ActiveRecord::Rollback
    end

    failure_callback
    # some logging could be here
    false
  end

  def success?
    @errors.empty?
  end

private

  def initialize(*_arguments)
    @errors = ServiceErrors.new
  end

  def executing
    raise 'not implemented'
  end

  def failure_callback
  end
end
```

---

```ruby
class ServiceErrors
  def errors
    @errors_storage.select { |_k, v| !v.empty? }
  end

  def full_messages
    @errors_storage.map { |k, v| v.map { |msg| "#{k.to_s.humanize} #{msg}" } }.flatten
  end

  def [](attribute)
    attribute = attribute.to_sym
    @errors_storage[attribute] ||= []

    @errors_storage[attribute]
  end

  def []=(attribute, messages)
    attribute = attribute.to_sym
    messages = Array(messages)
    @errors_storage[attribute] = messages
  end

  def empty?
    errors.empty?
  end

  def append_entity_errors(entity, key_name = nil)
    error_group_name = key_name || entity.class.to_s.underscore

    entity.errors.full_messages.each { |e| self[error_group_name] << e.downcase }
  end

  def to_json
    errors.to_json
  end

  def merge!(errors)
    @errors_storage.merge!(errors.errors) if errors.is_a? ServiceErrors
  end

private

  def initialize
    @errors_storage = {}
  end
end
```

---

```ruby
class RegistrationService < ApplicationService
  attr_reader :car

  def initialize(user:, params:)
    @params = params
    @user = user
    super
  end

  def executing
    create_user && create_car && send_notifications
  end
  private

  private

  def create_user
    @user = User.create(user_params)
    @errors[:user] = @user.errors.messages
    @user.persisted?
  end

  def create_car
    @car = Car.create(car_params)
    @errors[:car] = @user.errors.messages
    @car.persisted?
  end

  def send_notifications
    UserMailer.welcome(@user).deliver_later
  end

  def user_params
    @params.require(:user).permit(...)
  end

  def car_params
    @params.require(:car).permit(...).merge(user_id: @user)
  end
end
```

in controller

```ruby
def create
  @service = RegistrationService.(user: current_user, params: params)
  if @service.errors.empty?
    redirect_to some_welcome_path
  else
    render :new
  end
end
```

# Other ways
[https://blog.engineyard.com/2014/keeping-your-rails-controllers-dry-with-services](https://blog.engineyard.com/2014/keeping-your-rails-controllers-dry-with-services)

[https://aaronlasseigne.com/2016/04/27/improving-large-rails-apps-with-service-objects/](https://aaronlasseigne.com/2016/04/27/improving-large-rails-apps-with-service-objects/)

[http://multithreaded.stitchfix.com/blog/2015/06/02/anatomy-of-service-objects-in-rails/](http://multithreaded.stitchfix.com/blog/2015/06/02/anatomy-of-service-objects-in-rails/)

[http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)
