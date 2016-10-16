# Rack
---
<img src="img/rack/rack.jpg" width="100%;">
---

## Installing gem rack

```
bundle init # creates Gemfile
```
---
Gemfile
```ruby
# frozen_string_literal: true
# A sample Gemfile
source "https://rubygems.org"

# gem "rails"
```
---
```
bundle install
```
---
Gemfile.lock
```ruby
GEM
  remote: https://rubygems.org/
  specs:

PLATFORMS
  ruby

DEPENDENCIES

BUNDLED WITH
   1.12.5
```
---
Gemfile
```ruby
# frozen_string_literal: true

source "https://rubygems.org"
gem 'rack'
```
---
Gemfile.lock
```ruby
GEM
  remote: https://rubygems.org/
  specs:
    rack (2.0.1)

PLATFORMS
  ruby

DEPENDENCIES
  rack

BUNDLED WITH
   1.12.5
```
---
main.rb
```ruby
require 'rack'

app = ->(env){ [200, {}, ['response text']] }

Rack::Handler::default.run(app)
```
---
## rackup
main.rb
```ruby
require 'rack'

App = ->(env){ [200, {}, ['response text']] }
```
---
config.ru
```ruby
require './main'

run App
```
---
```
ᐅ rackup -p 8080
[2016-10-16 21:18:30] INFO  WEBrick 1.3.1
[2016-10-16 21:18:30] INFO  ruby 2.3.0 (2015-12-25) [x86_64-darwin15]
[2016-10-16 21:18:30] INFO  WEBrick::HTTPServer#start: pid=59703 port=8080
```
---
```
rackup -p 8080 -s puma
bundler: failed to load command: rackup (/Users/user/.gem/ruby/2.3.0/bin/rackup)
LoadError: cannot load such file -- rack/handler/puma
  /Users/user/.gem/ruby/2.3.0/gems/rack-2.0.1/lib/rack/handler.rb:74:in `require'
  /Users/user/.gem/ruby/2.3.0/gems/rack-2.0.1/lib/rack/handler.rb:74:in `try_require'
  /Users/user/.gem/ruby/2.3.0/gems/rack-2.0.1/lib/rack/handler.rb:16:in `get'
```
---
Gemfile
```ruby
# frozen_string_literal: true

source "https://rubygems.org"
gem 'rack'
gem 'puma'
```
---
```
ᐅ rackup -p 8080 -s puma
Puma starting in single mode...
* Version 3.6.0 (ruby 2.3.0-p0), codename: Sleepy Sunday Serenity
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://localhost:8080
Use Ctrl-C to stop
```
---
## Rack app as class
main.rb
```ruby
require 'rack'
require 'pp'

class App
  def call(env)
    pp env
    [200, {}, ['response text']]
  end
end
```
---
config.ru
```ruby
require './main'

run App.new
```
---
## Env object
`http://localhost:8080/test?param=value`
```
{"rack.version"=>[1, 3],
 "rack.errors"=>
  #<Rack::Lint::ErrorWrapper:0x007fc6bc42a920 @error=#<IO:<STDERR>>>,
 "rack.multithread"=>true,
 "rack.multiprocess"=>false,
 "rack.run_once"=>false,
 "SCRIPT_NAME"=>"",
 "QUERY_STRING"=>"param=value",
 "SERVER_PROTOCOL"=>"HTTP/1.1",
 "SERVER_SOFTWARE"=>"puma 3.6.0 Sleepy Sunday Serenity",
 "GATEWAY_INTERFACE"=>"CGI/1.2",
 "REQUEST_METHOD"=>"GET",
 "REQUEST_PATH"=>"/test",
 "REQUEST_URI"=>"/test?param=value",
 "HTTP_VERSION"=>"HTTP/1.1",
 "HTTP_HOST"=>"localhost:8080",
 "HTTP_CONNECTION"=>"keep-alive",
 "HTTP_CACHE_CONTROL"=>"max-age=0",
 "HTTP_UPGRADE_INSECURE_REQUESTS"=>"1",
 "HTTP_USER_AGENT"=>
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
 "HTTP_ACCEPT"=>
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
 "HTTP_DNT"=>"1",
 "HTTP_ACCEPT_ENCODING"=>"gzip, deflate, sdch",
 "HTTP_ACCEPT_LANGUAGE"=>
  "ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,uk;q=0.2,fr;q=0.2",
 "HTTP_COOKIE"=>"",
 "SERVER_NAME"=>"localhost",
 "SERVER_PORT"=>"8080",
 "PATH_INFO"=>"/test",
 "REMOTE_ADDR"=>"::1",
 "puma.socket"=>#<TCPSocket:fd 15>,
 "rack.hijack?"=>true,
 "rack.hijack"=>
  #<Proc:0x007fc6bc42b668@/Users/user/.gem/ruby/2.3.0/gems/rack-2.0.1/lib/rack/lint.rb:525>,
 "rack.input"=>
  #<Rack::Lint::InputWrapper:0x007fc6bc42a9c0
   @input=#<Puma::NullIO:0x007fc6bc4710c8>>,
 "rack.url_scheme"=>"http",
 "rack.after_reply"=>[],
 "puma.config"=>
  #<Puma::Configuration:0x007fc6bc2a1888
   @options=
    #<Puma::LeveledOptions:0x007fc6bc2a04b0
     @cur={},
     @defaults=
      {:min_threads=>0,
       :max_threads=>16,
       :log_requests=>false,
       :debug=>false,
       :binds=>["tcp://0.0.0.0:9292"],
       :workers=>0,
       :daemon=>false,
       :mode=>:http,
       :worker_timeout=>60,
       :worker_boot_timeout=>60,
       :worker_shutdown_timeout=>30,
       :remote_address=>:socket,
       :tag=>"kittens",
       :environment=>"development",
       :rackup=>"config.ru",
       :logger=>#<IO:<STDOUT>>,
       :persistent_timeout=>20},
     @set=
      [{:environment=>"development",
        :pid=>nil,
        :Port=>"8080",
        :Host=>"localhost",
        :AccessLog=>[],
        :config=>"/Users/user/dev/own/kittens/config.ru",
        :server=>"puma"},
       {:log_requests=>false,
        :environment=>"development",
        :binds=>["tcp://localhost:8080"],
        :app=>
         #<Rack::ContentLength:0x007fc6bc2a3a20
          @app=
           #<Rack::Chunked:0x007fc6bd074028
            @app=
             #<Rack::CommonLogger:0x007fc6bd074078
              @app=
               #<Rack::ShowExceptions:0x007fc6bc413e78
                @app=
                 #<Rack::Lint:0x007fc6bc413ec8
                  @app=
                   #<Rack::TempfileReaper:0x007fc6bc413f18
                    @app=#<App:0x007fc6bc208a98>>,
                  @content_length=nil>>,
              @logger=#<IO:<STDERR>>>>>},
       {:environment=>"development"},
       {}]>,
   @plugins=#<Puma::PluginLoader:0x007fc6bc2a02d0 @instances=[]>>,
 "rack.tempfiles"=>[]}
```
---
## Rack middleware
main.rb
```ruby
require 'rack'

class Middleware
  def initialize(next_app)
    p next_app # <App:0x007fd08c990f70>
    @app = next_app
  end

  def call(env)
    status, headers, body = @app.call(env)
    [status, headers, ['<h1>'] + body + ['</h1>']]
  end
end

class App
  def call(env)
    [200, {}, ['response text']]
  end
end
```
---
config.ru
```ruby
require './main'

use Middleware
run App.new
```
