# Introduction
## How to run

Hello world example

Create file `hi.rb`
```ruby
puts 'Hello!'
```

And run with program `ruby`
```bash
ruby hi.rb # Hello!
```

IRB
```
ᐅ irb
irb(main):001:0> puts 'Hello!'
Hello!
=> nil
irb(main):002:0>
```
---

## Variables

```ruby
# local
a = 5
a #=> 5
# instance
@a #=> nil
@a = 5
@a #=> 5
# global
$a #=> nil
$a = 5
$a #=> 5
# constant
A = 'constant'
A #=> "constant"
A = 'another' # Warning: already initialized constant A
A #=> "another"
```

## Everything is an object

```ruby
false.class #=> FalseClass
5.class #=> Fixnum
5.to_s #=> "5"
[4,5,3,2,2].reverse #=> [2, 2, 3, 5, 4]
```

## Numbers

```ruby
100.class #=> Fixnum
10_000_000_000_000_000_000.class #=> Bignum
100.0.class #=> Float

Complex(2, 3) #=> (2+3i)

0b11 #=> 3
010 #=> 8
0x10 #=> 16
```

### Numbers convertion

```ruby
1 + 1      #=> 2
1 + 1.0    #=> 2.0
5.to_f     #=> 5.0
(1 + 1).to_f #=> 2.0
```

### One more thing about objects

```ruby
1.+(2)
```

### Arithmetic operators

```ruby
1 + 1  #=> 2
5 - 1  #=> 4
3 * 4  #=> 12
12 / 3 #=> 4
11 % 2 #=> 1
2**10  #=> 1024
```

### Assignment operators

```ruby
a = 5   #=> 5
a += 1  #=> 6
a -= 1   #=> 5
a *= 2  #=> 10
a /= 2  #=> 5
a %= 3  #=> 2
a **= 2 #=> 4
```

### Floating point numbers precision
```ruby
10 / 3.0 # => 3.33333333333
```

---
```ruby
0.1 + 0.2 #=> 0.30000000000000004
```
---
**IEEE 754**
```ruby
0 01111101 00110011001100110011010 # 0.3
```
---
```ruby
1.23 * (10 ** 2)
```
---
```ruby
.123 * (10 ** 0)
1.23 * (10 ** 0)
123 * (10 ** 0)
1.23 * (10 ** 2)
999 * (10 ** 9)
```
---
```ruby
10_000_000_000.0 + 0.000_01 # => 10000000000.00001
10_000_000_000.0 + 0.000_000_1 # => 10000000000.0
```
---
```ruby
a = 1_000_000
while a < 100_000_000_000_000_000_000 do
  a += 0.000_000_001
end
```
---
```ruby
100_000_000.0.next_float # => 100000000.00000001
```
---
[ruby source](https://github.com/ruby/ruby/blob/59b089bd0902ee5de3b8fdb846fe9ece1c49b494/numeric.c#L1608)
```c
static VALUE
flo_next_float(VALUE vx)
{
    double x, y;
    x = NUM2DBL(vx);
    y = nextafter(x, INFINITY);
    return DBL2NUM(y);
}
```
---
## BigDecimal
```ruby
require 'bigdecimal'
(BigDecimal.new('10_000_000_000.0') + BigDecimal.new('0.000_000_000_000_001')).to_s
#=> "0.10000000000000000000000001E11"
```

## String

```ruby
a = "Hello!" # => "Hello!"
puts a # Hello!
#=> nil
String.new # => ""
```

### Interpolation

```ruby
'A is:' + a.to_s #=> "A is:5"
"A is: #{ a }"   #=> "A is: 5"
'A is: #{ a }'   #=> "A is: \#{ a }"
```

### String methods
[http://ruby-doc.org/core-2.2.0/String.html](http://ruby-doc.org/core-2.2.0/String.html)
```ruby
'aaa' + 'bbb' #=> 'aaabbb'
'abc'[1]      #=> 'b'
'abc'[1,2]    #=> 'bc'
'ruby'['u']   #=> "u"
'ruby'['c']   #=> nil
'Ruby'.downcase   #=> 'ruby'
'ruby'.capitalize #=> 'Ruby'
'ruby'.reverse    #=> 'ybur'
```

### Frozen literal string
```ruby
str = 'abcde'
str.gsub!('c', 'b')
```
---
```ruby
# frozen_string_literal: true
str = 'abcde'
str.gsub!('c', 'b') # raises RuntimeError: can't modify frozen String
```


## Array

```ruby
a = [1,2,3] #=> [1, 2, 3]
a.reverse   #=> [3, 2, 1]
a.sort      #=> [1, 2, 3]
a[1] #=> 2
a[1] = 'b'
a #=> [1, "b", 3]
a.take(2)       #=> [1, "b"]
a.length        #=> 3
a.empty?        #=> false
a.include?("b") #=> true
%w(a b c d #{5}) #=> ["a", "b", "c", "d", "\#{5}"]
%W(a b c d #{5}) #=> ["a", "b", "c", "d", "5"]
```

### Array operations
```ruby
a = [1,2,3] #=> [1, 2, 3]
b = [3,4,5] #=> [3, 4, 5]
a | b #=> [1, 2, 3, 4, 5]
a & b #=> [3]
a - b #=> [1, 2]
a + b #=> [1, 2, 3, 3, 4, 5]
a * 2 #=> [1, 2, 3, 1, 2, 3]

[1,2,3].|([3,4,5,6]) #=> [1, 2, 3, 4, 5, 6]
```

## Set

```ruby
require 'set'

some_set = Set.new([1,2,3,4,4]) # => #<Set: {1, 2, 3, 4}>

Set.new([1,2,3]) | Set.new([3,4,5]) # => #<Set: {1, 2, 3, 4, 5}>

Set.new([1,2,3]).subset? Set.new([1,2,3,4,5]) # => true
```

## Range

```ruby
1..5 #=> 1..5
a = %w(1 2 3 4 5 6 7 8 9 0)
#=> ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
a[1..4] #=> ["2", "3", "4", "5"]
"Ruby basics"[0..3] #=> "Ruby"
(1..10).to_a    #=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
('a'..'g').to_a #=> ["a", "b", "c", "d", "e", "f", "g"]
(1..10).cover?(2) #=> true
```

## Symbol

```ruby
:buyer    #=> :buyer
:'seller' #=> :seller
:buyer.object_id  #=> 536008
:buyer.object_id  #=> 536008
'buyer'.object_id #=> 70133611717900
'buyer'.object_id #=> 70133611669380
```

## Hash

```ruby
a = { 'мама' => 'mother', 'папа' => 'father' }
a['мама'] #=> "mother"

a = { key1: 'value1', key2: 'value2' }
a[:key1] #=> "value1"
a.fetch(:key3) #=> KeyError: key not found: :key3
a.fetch(:key3, :default_value) #=> :default_value

a.keys #=> [:key1, :key2]
a.values #=> ["value1", "value2"]

a = Hash.new('default value') #=> {}
a['blabla'] #=> "default value"

a = { outer: { nested: :value } }
a[:inner] && a[:inner][:nested] #=> nil
a.dig(:inner, :nested) # => nil
a.dig(:outer, :nested) #=> :value
```

## Time

```ruby
a = Time.new #=> 2015-07-05 12:07:05 +0300
a.year #=> 2015
a.month #=> 7
a.sec #=> 5
a.strftime('%Y-%m-%d %H:%M:%S') #=> "2015-07-05 12:07:05"
```

## IF

```ruby
if a == 4
  a = 7
end
if a == 4 then a = 7 end
a = 7 if a == 4
if a != 4
  a = 7
end
unless a == 4
  a = 7
end
a = 7 unless a == 4

puts('hi!') if a > 0 # 'hi!'
```

## if else

```ruby
a = 1
res = if a < 5
        "#{a} less than 5"
      elsif a > 5
        "#{a} greater than 5"
      else
        "#{a} equals 5"
      end
res #=> "1 less than 5"
```

```ruby
true ? 't' : 'f'  #=> "t"
false ? 't' : 'f' #=> "f"
```

## About false
```ruby
true # true
0 # true
'' # true
nil # false
false # false
```
---
```ruby
if a
  # do this
elsif !a
  # do that
else
  # wat?
end
```
---
```ruby
0/0 # raises ZeroDivisionError
0/0.0 # => NaN (instance of class Float)
NaN # => NameError: uninitialized constant NaN
!!(0/0.0) # => true
```

## or, and
```ruby
nil && 99   #=> nil
false && 99 #=> false
"cat" && 99 #=> 99
nil || 99   #=> 99
false || 99 #=> 99
"cat" || 99 #=> "cat"
```

## ||=

```ruby
@a #=> nil
@a ||= 5
@a #=> 5
@a ||= 6
@a #=> 5
```

## case
```ruby
a = 1
r = case
      when a < 5
        "#{a} less than 5"
      when a > 5
        "#{a} greater than 5"
      else
        "#{a} equals 5"
    end
r #=> "1 less than 5"
```

## loop
```ruby
i = 0
loop do
  i += 1
  next if i == 5
  print "#{i} "
  break if i == 10
end
#=> 1 2 3 4 6 7 8 9 10
```

## while, for
```ruby
i = 1
while i < 11
  print "#{i} "
  i += 1
end
#=> 1 2 3 4 6 7 8 9 10
for i in 1..10
  print "#{i} "
end
#=> 1 2 3 4 6 7 8 9 10
```

## Iterators
```ruby
a = (1..10)
a.each { |element| puts element }
a.map { |x| x * 2 }
#=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
a.map(&:to_s)
#=> ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
10.times { |i| puts i }
```

## Methods
```ruby
def this_is_one
  'one'
end
this_is_one #=> 'one'

def with_arg(arg)
  puts arg
end
with_arg(2) # '2'

def with_return
  return 'one'
  'two'
end
with_return #=> 'one'
```

## Methods args
```ruby
def many_args(arg1, *rest)
  "arg1=#{arg1}  rest=#{rest.inspect}"
end
many_args(1,2,3,4,5) #=> "arg1=1  rest=[2, 3, 4, 5]"
def split_apart(first, *split, last)
  "first: #{first.inspect}, split: #{split.inspect}, last: #{last.inspect}"
end
split_apart(1, 2) #=> "first: 1, split: [], last: 2"
split_apart(1, 2, 3) #=> "first: 1, split: [2], last: 3"
split_apart(1, 2, 3, 4) #=> "first: 1, split: [2, 3], last: 4"
```
---
```ruby
def foo(a, *b, **c)
  [a, b, c]
end

foo 10, 20, 30, d: 40, e: 50 #=> [10, [20, 30], {:d=>40, :e=>50}]
foo 10, d: 40, e: 50 #=> [10, [], {:d=>40, :e=>50}]
```
---
```ruby
def bar(a=1, b: 3)
  [a, b]
end

bar #=> [1, 3]

bar(2, b: 4) #=> [2, 4]
```
## Methods and blocks

```ruby
(1..10).map { |x| x * 2 }
def with_doubled(a)
  yield(a*2)
end
with_doubled(2) { |val| puts val } #=> 4
def try
  if block_given?
    yield
  else
    "no block"
  end
end
try #=> "no block"
try { "hello" } #=> "hello"
try do "hello" end #=> "hello"
```

## Proc and lambda
```ruby
# proc
square = Proc.new do |n|
  n ** 2
end
square.call(2) #=> 4

# lambda
bo = lambda { |param| "You called me with #{param}" }
bo.call(99) #=> "You called me with 99"

# Ruby 1.9 syntax
# proc
square = proc { |n| n**2 }
# lambda
square = ->(n) { n**2 }

# difference
def proc_return
  Proc.new { return "Proc.new" }.call
  return "proc_return return"
end
def lambda_return
  lambda { return "lambda" }.call
  return "lambda_return return"
end
proc_return #=> "Proc.new"
lambda_return #=> "lambda_return return"
```

## Call-by-reference

```ruby
a = [1,2,3]
b = a
b #=> [1, 2, 3]
a[1] = 100
b #=> [1, 100, 3]
a = [1,2,3]
b = a.clone
a[1] = 1000
b #=> [1, 2, 3]
a #=> [1, 1000, 3]
```
