
#Prerequisites to have to run this application

1. Install npm


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Install packages included in the project into local, you should run:

### `npm install --save`

In the project directory, Run the application using:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# What I did in this project

1. Created empty Github repository for the project 

2. Created react app in local using `npx create-react-app invoice_challenge`

3. Installed necessary packages in local using node package manager (npm)

4. Did architecture of the project into reusable components and screens.

5. The application entry point is app.js, so views are imported into app.js and navigated from there

6. Added Axios instance with the base url and added headers needed to make the request with the authorization token

7. made structure to create an invoice with details like customer name, invoice details, item details, memo and the amount detils like subtotal, tax and the total.

8. Fetched Customer details from sample curl given in mail `https://api.qd.fattpay.com/customer` with the token provided as prod api is not working without correct given.

9. Fetched item details from sample curl given in mail `https://api.qd.fattpay.com/item` with the token provided as prod api is not working without correct given.

10. Calculated the total amount based on the items added into the invoice with their respective prices fetched from database multiplied by the quantity requested.

11. Included the items which have discounts and subtracted from the total based on the discount percentage and the value of the discount requested.

12. Made the post request using the sample curl given in mail `https://api.qd.fattpay.com/invoice` with the details filled in the invoice creation form and displaying the response to the user.

13. If any information is missing in the body of post request made to create an invoice, displaying the bad request message to the user.

14. with successful creation of invoice, the page will be refreshed with new invoice number to create a new invoice for the user.

