const {calculateTip,celsiusToFahrenheit,fahrenheitToCelsius,add}=require('../src/math')

test('Should calculate total with tip',()=>{
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total withdefault tip', ()=>{
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('Should convert fahrenheit to ceclius',()=>{
    const convertion=fahrenheitToCelsius(32)
    expect(convertion).toBe(0)
})

test('Should convert Celcius to Fahrenheit',()=>{
    const convertion=celsiusToFahrenheit(0)
    expect(convertion).toBe(32)
})

// Waits until done function to be called
// test('Async test demo',(done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2)
//         done()
//     },2000)

// })

test('Should add two numbers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await',async ()=>{
    const sum= await add(10,22)
    expect(sum).toBe(32)
})