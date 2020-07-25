const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-body');
const mongoose = require('mongoose');

const orders = require('./routes/orders');

app.use(bodyParser())
app.use(orders.routes())

mongoose.connect(
  'mongodb://localhost:koajsorders',
  {useNewUrlParser: true}
)

app.listen(5000, () => {
  console.log('Server running at port 5000')
})