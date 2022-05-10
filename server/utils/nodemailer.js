const nodemailer = require('nodemailer')

const translation = {
    ru: {
        name: "Имя",
        surname: "Фамилия",
        email: "Email",
        phone: "Телефон",
        city: "Город",
        delivery: "Доставка",
        payment: "Оплата",
        orderDate: "Дата оформления",
        Order: "Заказ",
        confirmed: "оформлен",
        BuyerData: "Данные покупателя",
        Goods: "Товар",
        total: "Итого",
        notFilled: "Не указано",
        orderDescription: "Ваш заказ будет рассмотрен  в ближайшее время, с вами свяжутся для его подтверждения. По всем вопросам писать на Viber +380689125456",
    },
    uk: {
        name: "Ім'я",
        surname: "Прізвище",
        email: "Email",
        phone: "Телефон",
        city: "Місто",
        delivery: "Доставка",
        payment: "Оплата",
        orderDate: "Дата оформлення",
        Order: "Замовлення",
        confirmed: "оформлено",
        BuyerData: "Дані покупця",
        Goods: "Товар",
        total: "Всього",
        notFilled: "Не вказано",
        orderDescription: "Ваше замовлення буде розглянуто найближчим часом, з вами зв'яжуться для його підтвердження. З усіх питань писати на Viber +380689125456",
    },
    en: {
        name: "Name",
        surname: "Surname",
        email: "Email",
        phone: "Phone",
        city: "City",
        delivery: "Delivery",
        payment: "Payment",
        orderDate: "Order date",
        Order: "Order",
        confirmed: "sent for processing",
        BuyerData: "Buyer data",
        Goods: "Goods",
        total: "Total",
        notFilled: "Not filled",
        orderDescription: "Your order will be reviewed as soon as possible, you will be contacted to confirm it. For all questions write to Viber +380689125456",
    }
}

module.exports = (data, totalPrice) => {

    const mailLanguage = data.mailLanguage || 'uk';

    const productList = Object.values(data.products)

    const isNotDefined = translation[mailLanguage]['notFilled']

    let productListHTML = ``;

    productList.forEach(product => {
        productListHTML += `
        <div class="product">
            <div class="productImage">
                <img src=${product.image} alt="Image not found" />
            </div>
            <div class="productInfo">
                <h2 class="productInfoTitle">${product.name[mailLanguage]}</h2>
                <div class="productInfoCost">
                    <span>${product.current_price} ₴ <span> &#xA0;&#xA0; x &#xA0;&#xA0; ${product.quantity}</span></span>
                    <span style="float: right">${product.total_price} ₴</span>
                </div>
            </div>
        </div>`
    })

    const html =
`<html>
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
         body {
         font-size: 16px;
         font-weight: 600;
         height: auto;
         background-color: #ffffff;
         color: #1C1C1C;
         padding: 10px;
         }
         .orderTitle {
         font-weight: 600;
         font-size: 20px;
         line-height: 28px;
         text-align: center;
         }
         .orderDescription {
         margin-top: 36px;
         margin-bottom: 50px;
         font-size: 14px;
         line-height: 28px;
         }
         .infoBlock {
         margin-bottom: 40px;
         }
         .infoBlockTitle {
         display: flex;
         align-items: center;
         }
         .infoBlockTitle > h2 {
         font-weight: 600;
         font-size: 18px;
         line-height: 22px;
         margin: 0;
         margin-left: 10px;
         }
         .infoBlockTitle > svg {
         width: 24px;
         height: 24px;
         }
         .infoBlockContent {
         margin-top: 25px;
         }
         .totalPrice {
         display: inline-block;
         margin-top: 20px;
         }
         .contentRow {
         width: 100%;
         }
         .contentColumn {
         font-weight: 600;
         padding: 12px 5px;
         border-bottom: 1px solid #ececece6;
         width:15%;
         min-height: 40px;
         font-size: 14px;
         line-height: 24px;
         }
         .contentColumn :last-child {
         border-bottom: 1px solid #ececece6;
         width:75%;
         margin-left: 18px;
         }
         .orderPrice {
         font-size: 17px;
         line-height: 20px;
         display: flex;
         flex-direction: column;
         }
         .orderPrice > p:first-child {
         margin-bottom: 4px;
         font-size: 14px;
         font-weight: 600;
         }
         .price {
         font-weight: 600;
         padding-left: 6px;
         padding-top: 1px;
         font-size: 16px;
         white-space: nowrap;
         }
         .product {
         border-bottom: 1px solid #ececece6;
         padding: 11px 0;
         position: relative;
         display: flex;
         }
         .productImage {
         min-width: 90px;
         width: 110px;
         position: relative;
         }
         .productImage img {
         border-radius: 6px;
         width: 100%;
         }
         .productInfo {
         width: 100%;
         color: #1C1C1C;
         margin-left: 16px;
         flex: 1;
         }
         .productInfoTitle {
         font-weight: 600;
         font-size: 13px;
         line-height: 20px;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
         overflow: hidden;
         text-overflow: ellipsis;
         word-wrap: break-word;
         }
         .productInfoCost {
         width: 100%;
         margin-top: 10px;
         }
         .productInfoCost  span {
         font-size: 13px;
         font-weight: 600;
         line-height: 20px;
         }
         .productQuantityNumber {
         margin: 0 21px;
         font-size: 14px;
         font-weight: 600;
         width: 22px;
         text-align: center;
         }
         .productQuantity {
         display: flex;
         align-items: center;
         margin-top: 24px;
         margin-left: 4px;
         }
         .productQuantityButton {
         border: none;
         background: none;
         cursor: pointer;
         width: 14px;
         height: 14px;
         padding: 0;
         }
         .productQuantityButton > svg {
         width: 12px;
         height: 12px;
         border-radius: 50%;
         }
         .userIcon, .productsIcon {
         width: 10px;
         height: 23px;
         background-color: #1c1c1c;
         border-radius: 4px;
         }
      </style>
   </head>
   <body>
      <div class="PlacedOrder_container__T_hvr">
         <h1 class="orderTitle">${translation[mailLanguage].Order} №1652110161250 ${translation[mailLanguage].confirmed}!</h1>
         <p class="orderDescription">${translation[mailLanguage].orderDescription}</p>
         <div class="infoBlock">
            <div class="infoBlockTitle">
               <span class="userIcon"></span>
               <h2>${translation[mailLanguage].BuyerData}</h2>
            </div>
            <table class="infoBlockContent">
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].name}</td>
                  <td class="contentColumn">${data.name}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].surname}</td>
                  <td class="contentColumn">${data.surname}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].email}</td>
                  <td class="contentColumn">${data.email}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].phone}</td>
                  <td class="contentColumn">${data.phone}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].city}</td>
                  <td class="contentColumn">${data.city}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].delivery}</td>
                  <td class="contentColumn">${(data.post_adress && data.post_number) ? `Нова Пошта, ${data.post_adress}, №${data.post_number}` : (data.local_address || isNotDefined)}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].payment}</td>
                  <td class="contentColumn">${data.payment}</td>
               </tr>
               <tr class="contentRow">
                  <td class="contentColumn">${translation[mailLanguage].orderDate}</td>
                  <td class="contentColumn">${data.created_at}</td>
               </tr>
            </table>
         </div>
         <div class="infoBlock">
            <div class="infoBlockTitle">
               <span class="productsIcon"></span>
               <h2>${translation[mailLanguage].Goods}</h2>
            </div>
            <div class="infoBlockContent">
               ${productListHTML}
            </div>
            <div class="totalPrice">
               <div class="orderPrice">
                  <p>${translation[mailLanguage].total}:</p>
                  <p class="price">${totalPrice} ₴</p>
               </div>
            </div>
         </div>
      </div>
   </body>
</html>`


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'vinorosend@gmail.com',
        pass: 'mtvyrpibtzlkpoec'
        }
    });

    transporter.sendMail({
        from: 'vinorosend@gmail.com',
        to: `vinorosend@gmail.com, grigovlad09112002@gmail.com`,
        subject: `vinoro.shop - ${translation[mailLanguage].Order} №1652110161250 ${translation[mailLanguage].confirmed}!`,
        html: html
    }, function(error, info){
        if (error) {
         console.log(error);
        } else {
         console.log('Email sent: ' + info.response);
        }
    });
}

