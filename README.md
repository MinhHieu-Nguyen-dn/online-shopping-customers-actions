## Online shopping: customers' actions (API with Postman, MongoDB)

---
#### Create a new Database in MongoDB with name:
> test2711_online_shopping

##### then import collections from the folder:
> testData

---
**Terminal:**
``` 
npm run dev:start
```
---
### Test with *localhost:3000*

#### [GET] localhost:3000/ -> landing page

#### [GET] localhost:3000/products -> list all available products

#### [POST] localhost:3000/cart  
> input (Body > Raw > JSON):  
``` 
{
    "userId": "..." (from users collection) 
}
```
*-> findOne successfully -> show cart*  
*-> findOne fail -> create new Cart save to carts collection, response: empty*  

#### [POST] localhost:3000/invoice   
> input (Body > Raw > JSON):  
```
{
    "userId": "...", (from users collection - this user has already had a cart before)  
    "all": true/false,  
    "payListId": null / [... (list of Id(s) in Cart that the user wants to pay for)]  
}
```
*-> all = true (payListId = null) -> price * quantity*  
*-> all = false -> get items in cart that have Id appears in payListId -> bill = quantity * price (price from products collection) -> save a new invoice in invoices collection*  

#### [POST] localhost:3000/cart/add  
> input (Body > Raw > JSON):  
```
{
    "userId": "...", (from users collection - this user has already had a cart before)  
    "products":   
        [  
            {  
                "product": _id from products collection,   
                "quantity": number  
            },  
            ...  
        ]
}
```  
*-> show new cart with added items*

#### [POST] localhost:3000/cart/delete  
> input (Body > Raw > JSON):  
```
{
    "userId": "...", (from users collection - this user has already had a cart before)  
    "all": true/false,  
    "listIdInCartToDelete": null/[... (list of Id(s) in Cart that the user wants to delete)]  
}	
```
*-> all = true (listIdInCartToDelete = null) -> show new cart (empty)*  
*-> all = false, delete items in cart that have Id appears in listIdInCartToDelete -> show updated cart*  

#### [POST] localhost:3000/cart/update  
> input (Body > Raw > JSON):  
```
{
    "userId": "...", (from users collection - this user has already had a cart before)  
    "inCartId": "..." (1 _id in user's cart that he/she wants to change the quantity),  
    "newQuantity": number  
}
```
*-> show updated cart after change the quantity of 1 item*