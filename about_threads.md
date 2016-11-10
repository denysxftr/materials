# Threads

```ruby
sleep_thread = Thread.new do
  loop do
    sleep(1)
    puts('hi')
  end
end

sleep_thread.join(10) # => nil after 10 secs
sleep_thread.kill # => #<Thread:0x007f8339176740@(irb):1 dead>
sleep_thread.alive? # false
```

---

```ruby
Thread.list[0] == Thread.current # true

Thread.new do
  loop do
    sleep(1)
  end
end

Thread.list # => [#<Thread:0x0055ce7a3be360 run>, #<Thread:0x0055ce7a7214d0@(repl):1 run>]
```
---

```ruby
Thread.new do
  loop do
    sleep(5)
  end
end

p Thread.list # [#<Thread:0x0055d3403b2360 run>, #<Thread:0x0055d3406ffdb0@(repl):1 run>]

Thread.kill(Thread.list.last)

p Thread.list # [#<Thread:0x0055d3403b2360 run>]
```

---

```ruby
thread = Thread.new do
  puts 'before stop'
  Thread.stop
  puts 'after stop'
end

sleep(1)
puts 'on stop'
thread.wakeup
thread.join
```

---

```ruby
class A
  def enabled?
    @enabled
  end

  def enable!
    puts 'Enabling...'
    sleep(0.1)
    @enabled = true
  end

  def initialize
    @enabled = false
  end
end

a = A.new

10.times do
  Thread.new(a) do |value|
    value.enable! unless value.enabled?
  end
end
```

---
[https://ruby-doc.org/core-2.3.0/Mutex.html](https://ruby-doc.org/core-2.3.0/Mutex.html)
```ruby
a = A.new
semaphore = Mutex.new

10.times do
  Thread.new(a) do |value|
    semaphore.synchronize do
      value.enable! unless value.enabled?
    end
  end
end
```
---
```ruby
Thread.new do
  raise 'error' # will not raise error
end

Thread.abort_on_exception = true

Thread.new do
  raise 'error' # will raise RuntimeError
end
```
---

```ruby
array = []

5.times.map do
  Thread.new do
    1000.times do
      array << nil
    end
  end
end.each(&:join)

array.size # 5000
```

---

```ruby

def time
  t = Time.now
  yield
  Time.now - t
end


def threads
  t1 = Thread.new do
    10_000_000.times { 3 ** 10 }
  end
  t2 = Thread.new do
    10_000_000.times { 3 ** 10 }
  end
  t1.join
  t2.join
end

def no_threads
  20_000_000.times { 3 ** 10 }
end

time { no_threads } # 2.3 secs on my laptop

time { threads } # 2.3 secs too
```

---
# GIL

```ruby

Thread.new { loop { print 'a' } }
Thread.new { loop { print 'b' } }

```
