const prop0 = {
  name: {
    type: 'string',
    title: 'Name',
    description: 'User name'
  }, 
  balance: {
    type: 'number',
    title: 'Balance ($)',
    ui: 'num.2'
  }
}
const data0 = [
  {
    name: 'Alice',
    balance: 1400.20
  }, {
    name: 'Bob',
    balance: 1250.34
  }
]

const prop1 = {
  name: {
    type: 'string',
    title: 'Name',
    description: 'User name'
  }, 
  age: {
    type: 'integer',
    title: 'Age (Y)',
    description: 'User age'
  }
}
const data1 = [
  {
    name: 'June Kirk',
    age: 20
  }, {
    name: 'Mathews Mcgowan',
    age: 24
  }, {
    name: 'Tyson Hatfield',
    age: 30
  }, {
    name: 'Stacey Gentry',
    age: 33
  }, {
    name: 'Olive Huff',
    age: 23
  }, {
    name: 'Harriet Benton',
    age: 30
  }, {
    name: 'Tran Heath',
    age: 29
  }, {
    name: 'Christie Sloan',
    age: 20
  }, {
    name: 'Diaz Williams',
    age: 33
  }, {
    name: 'Kelley Tyson',
    age: 34
  }, {
    name: 'Eve Snider',
    age: 23
  }, {
    name: 'Baird Lynch',
    age: 24
  }, {
    name: 'Arline Chang',
    age: 36
  }
]

const prop2 = {
  name: {
    type: 'string',
    title: 'Name',
    description: 'User name',
    totals: 'count'
  }, 
  age: {
    type: 'integer',
    title: 'Age (Y)',
    description: 'User age',
    totals: 'avg'
  }, 
  balance: {
    type: 'number',
    title: 'Balance ($)',
    ui: 'num.2',
    totals: 'sum'
  }
}
const data2 = [
  {
    name: 'June Kirk',
    age: 20,
    balance: 1260.38
  }, {
    name: 'Mathews Mcgowan',
    age: 24,
    balance: 3072.78
  }, {
    name: 'Tyson Hatfield',
    age: 30,
    balance: 1326.09
  }, {
    name: 'Stacey Gentry',
    age: 33,
    balance: 3318.59
  }, {
    name: 'Olive Huff',
    age: 23,
    balance: 1747.45
  }, {
    name: 'Harriet Benton',
    age: 30,
    balance: 1146.87
  }, {
    name: 'Tran Heath',
    age: 29,
    balance: 2510.93
  }, {
    name: 'Christie Sloan',
    age: 20,
    balance: 3022.48
  }, {
    name: 'Diaz Williams',
    age: 33,
    balance: 3410.05
  }, {
    name: 'Kelley Tyson',
    age: 34,
    balance: 3973.95
  }, {
    name: 'Eve Snider',
    age: 23,
    balance: 2823.23
  }, {
    name: 'Baird Lynch',
    age: 24,
    balance: 2459.93
  }, {
    name: 'Arline Chang',
    age: 36,
    balance: 3906.51
  }
]
const prop3 = {
  name: {
    type: 'string',
    title: 'Name',
    description: 'User name',
    totals: 'count'
  }, 
  age: {
    type: 'integer',
    title: 'Age (Y)',
    description: 'User age',
    totals: 'avg',
    ui: 'hide'
  }, 
  balance: {
    type: 'number',
    title: 'Balance ($)',
    ui: 'num.2',
    totals: 'sum'
  }
}

export {prop0, data0, prop1, data1, prop2, data2, prop3}
