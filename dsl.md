# DSL
```ruby
Rails.application.routes.draw do
  get '/users', to: 'users#index'
end
```

---

```ruby
config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
end
```

---
wrong
```ruby
class Config
  def initialize
    yield
  end

  def port(port)
    @port = port
  end

  def host(host)
    @host = host
  end

  def path(path)
    @path = path
  end
end
```

---
wrong
```ruby
class Config
  def initialize(&block)
    block.call()
  end

  def port(port)
    @port = port
  end

  def host(host)
    @host = host
  end

  def path(path)
    @path = path
  end
end
```

---
works
```ruby
class Config
  def initialize(&block)
    instance_exec(&block)
  end

  def port(port)
    @port = port
  end

  def host(host)
    @host = host
  end

  def path(path)
    @path = path
  end
end

config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
end

config # => #<Config:0x0055bf3711f110 @port=8080, @host="localhost", @path="/tmp">

config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
  password '12345678' # undefined method `password'
end
```

---

```ruby
class Config
  def initialize(&block)
    instance_exec(&block)
  end

  def method_missing(name, *args)
    puts "#{name}(#{args.map(&:inspect).join(', ')})"
  end
end


config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
  password '12345678'
end
```

---

```ruby
class Config
  def initialize(&block)
    instance_exec(&block)
  end

  def method_missing(name, *args)
    instance_variable_set("@#{name}", args.size == 1 ? args[0] : args)
  end
end


config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
  password '12345678'
end

config # => #<Config:0x0055866e29b3b0 @port=8080, @host="localhost", @path="/tmp", @password="12345678">
```

---

```ruby
class Config
  def initialize(&block)
    instance_exec(&block)
  end

  def method_missing(name, *args)
    return instance_variable_get("@#{name}") if args.empty?

    instance_variable_set("@#{name}", args.size == 1 ? args[0] : args)
  end
end


config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
  password '12345678'
end

config.password # => '12345678'
```

---

```ruby
class Config
  def initialize(&block)
    instance_exec(&block)
  end

  def method_missing(name, *args)
    self.singleton_class.send(:define_method, name) do |value=nil|
      return instance_variable_get("@#{name}") unless value
      instance_variable_set("@#{name}", value.size == 1 ? value[0] : value)
    end
    send(name, args)
  end
end


config = Config.new do
  port 8080
  host 'localhost'
  path '/tmp'
  password '12345678'
end

p config # #<Config:0x0056168294e690 @port=8080, @host="localhost", @path="/tmp", @password="12345678">
puts config.methods.include?(:other_one) # false
config.other_one('some value')
puts config.methods.include?(:other_one) # true
p config # #<Config:0x0056168294e690 @port=8080, @host="localhost", @path="/tmp", @password="12345678", @other_one="some value">
```
