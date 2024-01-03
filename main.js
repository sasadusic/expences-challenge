// main.js

let jsonData; // Declare jsonData in a global scope

// Function to fetch data from data.json
async function fetchData() {
  try {
    const response = await fetch('data.json');
    jsonData = await response.json();
    // Now jsonData is accessible globally
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Use the fetchData function to get the data
fetchData().then(() => {
  // Now you can use jsonData here or elsewhere in your application
  console.log(jsonData);
  const weekGrid = document.querySelector('.week-grid')
  const highestAmount = jsonData.reduce((max, current) => (current.amount > max.amount ? current : max));
  const top = highestAmount.amount

console.log(highestAmount);

    jsonData.forEach(dayName => {
        // Item
        const item = document.createElement('div')
        item.className = 'item'
        
        // Amount
        const amount = document.createElement('div')
        amount.classList.add('amount')
        const percent = Math.floor((dayName.amount / top) * 100)
        // console.log(percent)
        amount.style.cssText = `
        width: 100%;
        height: ${percent}%;
        background: ${dayName.amount === highestAmount.amount ? 'var(--Cyan)' : 'var(--Soft-red)'};
        border-radius: 6px;
        position: relative;
        `
        // Perc
        const perc = document.createElement('div')
        perc.classList.add('perc')
        perc.innerText = `\$${dayName.amount}`

        amount.onmouseover = () => {
            amount.classList.add(dayName.amount === highestAmount.amount ? 'big-amount-hover' : 'amount-hover')
            perc.classList.add('perc-hover')
        }
        amount.onmouseout = () => {
            amount.classList.remove(dayName.amount === highestAmount.amount ? 'big-amount-hover' : 'amount-hover')
            perc.classList.remove('perc-hover')
        }
        // Day name
        const day = document.createElement('div')
        day.className = 'day'
        day.innerText = dayName.day

        amount.appendChild(perc)
        item.appendChild(amount)
        item.appendChild(day)
        // item.appendChild(perc)
        weekGrid.appendChild(item)
    })
});

const amounts = document.querySelectorAll('.amount')

amounts.forEach(amount => {
    amount.onmouseover = () => {
        // alert('over')
        amount.classList.add('amount-hover')
    }
    amount.onmouseout = () => {
        // alert('leave')
        amount.classList.remove('amount-hover')
    }
})