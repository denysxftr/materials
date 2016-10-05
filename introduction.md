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
# inctance
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
A = 'another'
(irb):98: warning: already initialized constant A
(irb):96: warning: previous definition of A was here
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
10000000000000000000.class #=> Bignum
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

a.keys #=> [:key1, :key2]
a.values #=> ["value1", "value2"]

a = Hash.new('default value') #=> {}
a['blabla'] #=> "default value"

a = { outer: { nested: :value } }
a[:inner] && a[:inner][:nested] #=> nil
a.dig(:inner, :nested) # => nil
a.dig(:outer, :nested) #=> :value
```
