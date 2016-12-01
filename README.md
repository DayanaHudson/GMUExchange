# GMUExchange
Marketplace to buy and sell textbooks, notebooks, or other class materials.

*HW8 scenarios to test: register, search, and post a product.

The four scenarios we decided on were as follows:

1.) Register

   A new user can sign in to GMUExchange by providing an e-mail address and password. The application checks that the e-mails is            affiliated with GMU through use of regular expressions (ends in @gmu.edu or @masonlive.gmu.edu). The application sets the user’s        netID to his username, and the user can then log in by providing either his netID, his @gmu.edu e-mail, or his @masonlive.gmu.edu      e-mail and his password. Credentials can be changed after registration.

2.) Search / Browse products

   Currently, users can browse the available products and search by keyword, maximum price, professor, class, category, and posted date. In the future, we will add functionality for users to view the seller (including his rating and profile), and whether his price is negotiable or not.

3.)Post a product

   A registered user can post a product on the site by providing its category (book, class notes, class materials, or miscellaneous), a    subcategory (dorm essentials, other) if the main category is miscellaneous, or the class name (e.g. ECE 301) and professor              otherwise. The user must then upload a photo of the product to reflect its quality, the price requested for the product, and            whether or not the price is final or negotiable. If the main category is book, the user must provide an ISBN, and the application      will then use the Amazon API to search for the market price for the book, which is also displayed to the user posting a product        before finalizing the post, and to users viewing the post.

4.)Home visualization

   Users are able to see a breakdown of posted products of the current year for each month. They can hover over the categories
   (textbooks, class notes, class materials, miscellaneous) to view how many of each has been sold by month, or they can hover over the
   month to view the breakdown of posts by category.

https://dayanahudson.github.io/GMUExchange/public/index.html
Heroku:
https://sheltered-journey-42475.herokuapp.com/
