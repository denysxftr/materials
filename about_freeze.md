# About freeze

```ruby
CONFIG_FILE = '/some/path/config.yml'
CONFIG_FILE = '/some/other/path/config.json' # warning

CONFIG_FILE = '/some/path/config.yml'
CONFIG_FILE.gsub!('yml', 'json')
```

---

```ruby
CONFIG_FILES = ['/one/file.json', '/second/file.yml']
CONFIG_FILES << '/third/file.toml'
p CONFIG_FILES # ["/one/file.json", "/second/file.yml", "/third/file.toml"]
```

---

```ruby
CONFIG_FILES = ['/one/file.json', '/second/file.yml'].freeze
CONFIG_FILES << '/third/file.toml' # can't modify frozen Array
p CONFIG_FILES
```

---

```ruby
CONFIG = {
	step: 2,
	initial_string: 'aaaaaaaa'
}.freeze

CONFIG.merge!(step: 3)
```

---

```ruby

class Config
  attr_accessor :step, :initial_string
end

config = Config.new
config.step = 1
config.initial_string = 'aaaaaaaa'
config.freeze
p config # #<Config:0x0055cbfe46b840 @step=1, @initial_string="aaaaaaaa">
config.step = 2 # will fail
```

---

```ruby
class Config
  attr_accessor :step, :initial_string
end

config = Config.new
config.step = 1
config.initial_string = 'aaaaaaaa'
config.freeze
p config # #<Config:0x0055cbfe46b840 @step=1, @initial_string="aaaaaaaa">
config.initial_string.gsub!('a', 'b')
p config #<Config:0x0055f527883638 @step=1, @initial_string="bbbbbbbb">
```

---

```ruby
class Config
  attr_accessor :step, :initial_string

  def initialize(step:, initial_string:)
    @step = step
    @initial_string = initial_string.freeze
    freeze
  end
end

config = Config.new(step: 2, initial_string: 'aaaaaaaa')
p config # #<Config:0x0055cbfe46b840 @step=1, @initial_string="aaaaaaaa">
config.initial_string.gsub!('a', 'b') # will fail
p config
```

---

```ruby
CONFIG = {
  step: 2,
  initial_string: 'aaaaaaaa'
}.freeze

CONFIG[:initial_string].gsub!('a', 'b')

p CONFIG # {:step=>2, :initial_string=>"bbbbbbbb"}
```

---

## Solution
[https://github.com/dkubb/ice_nine](https://github.com/dkubb/ice_nine)
