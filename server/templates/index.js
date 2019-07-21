const uuid = require('uuid/v4')

module.exports = ({ name, address, article1, article2, price1, price2 }) => {
    const date = new Date().toString()
    const handlePrice = (string) => string ? parseFloat(string).toFixed(2) : parseFloat('0').toFixed(2)
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
  <style>
    .invoice {
      font-family: 'Montserrat', sans-serif;
  max-width: 800px;
  padding: 5px;
  margin: 0 auto;
}

.invoice_navbar-brand {
  font-size: 18px;
  margin-left: 5px;
}

.invoice_container {
  padding: 0 15px;
}

.invoice_text-right {
  text-align: right;
}

.invoice_list-group {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-bottom: none;
}

.invoice_list-group.top {
  border-radius: 5px 5px 0 0;
  border-color: #007bff;
  background-color: #007bff;
  color: #ffffff;
}

.invoice_list-group.bottom {
  border-radius: 0 0 5px 5px;
  background-color: #c6c8ca;
}

.invoice_list-item {
  display: inline-block;
  padding: 5px;
  min-width: 100px;
}

.invoice_list-item.description {
  border-right: 1px solid #cccccc;
  width: 400px;
}
  </style>
  <title>Invoice</title>
</head>

<body>
  <div class="invoice">
    <nav class="invoice_navbar">
      <img src="http://kidsforward.net/assets/PDF-Logo.png" class="d-inline-block align-top" alt="logo" width="30"
        height="30" />
      <span class="invoice_navbar-brand">
        Invoice number: ${uuid()}
      </span>
    </nav>
    <div class="invoice_container">
      <p class="invoice_text-right">${date}</p>
      <p>Name: <strong>${name}</strong></p>
      <p>Address: ${address}</p>
      <div class="invoice_list-group top">
        <div class="invoice_list-item description">Description</div>
        <div class="invoice_list-item">Price</div>
      </div>
      <div class="invoice_list-group">
        <div class="invoice_list-item description">${article1}</div>
        <div class="invoice_list-item invoice_text-right">${handlePrice(price1)}</div>
      </div>
      <div class="invoice_list-group">
        <div class="invoice_list-item description">${article2}</div>
        <div class="invoice_list-item invoice_text-right">${handlePrice(price2)}</div>
      </div>
      <div class="invoice_list-group bottom">
        <div class="invoice_list-item description invoice_text-right">Total</div>
        <div class="invoice_list-item invoice_text-right">${handlePrice(Number(price1) + Number(price2))}</div>
      </div>
    </div>
  </div>
</body>

</html>
  `
}