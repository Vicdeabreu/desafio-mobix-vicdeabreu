const Router = require('koa-router');
const router = new Router();
const Order = require('../models/Order');

router.get('/api/orders', async ctx => {
  await Order.find()
  .then(orders => {
    ctx.body = orders
  })
  .catch(err => {
    ctx.body = 'error: ' + err
  })
})

router.post('/api/order', async ctx => {
  if(!ctx.request.body.order_name){
    ctx.body = {
      error: 'Algo deu errado, verifique sua ordem'
    }
  }else{
    var order = new Order()
    order.order_name = ctx.request.body.order_name;
    await order.save()
    .then(data => {
      ctx.body = data
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
  }
})

router.delete('/api/order/:id', async ctx => {
  await Order.deleteOne({
    _id: ctx.params.id
  })
  .then(() => {
    ctx.body = {status: 'Ordem Apagada!'}
  })
  .catch(err => {
    ctx.body = 'error ' + err
  })
})

router.put('/api/order/:id', async ctx => {
  if(!ctx.request.body.order_name) {
    ctx.body = {
      error: 'Ensira uma ordem valida'
    }
  }else {
    await Order.findOneAndUpdate(
      {_id: ctx.params.id },
      { order_name: ctx.request.body.order_name }
    )
    .then(() => {
      ctx.body = {status: 'Ordem atualizada' }
    })
    .catch(err => {
      ctx.body = 'error: ' + err
    })
  } 
})

module.exports = router