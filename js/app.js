var categoryListings = [
   {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
   {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
   {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
]

window.addEventListener('load', function() {

    var router = new Router();

    Backbone.history.start();

});


/******************************
* ROUTES
******************************/
var Router = Backbone.Router.extend({
  routes: {
    "": "renderHome",
    "show-books/:generalCategory": "renderBookBySub",
    "show-books/:generalCategory/:subCategory": "renderBookBySub",
    "search/:query": "renderBookBySub",
  },

  initialize: function() {
    var categoryListEl = document.querySelector('.category-listings')
    categoryListEl.innerHTML = ''

    var ul = document.createElement('UL')
    ul.id = "categoryUl"

    // add categories
    categoryListings.forEach(function(cat){
      var li = document.createElement('LI')
      var a = document.createElement('A')
      li.classList.add('main-category')
      a.href = '#/show-books/' + cat.catName
      a.textContent = cat.catName

      li.appendChild(a)
      ul.appendChild(li)

      //add sub categories
      cat.subcatList.forEach(function(subcat){
        var subLI = document.createElement('LI')
        var subA = document.createElement('A')
        subLI.classList.add('sub-category')

        subA.href = '#/show-books/' + cat.catName + '/' + subcat
        subA.textContent = subcat

        subLI.appendChild(subA)
        li.appendChild(subLI)
      })


    })
    categoryListEl.appendChild(ul)

    var search = document.querySelector('.search-bar')
    var submit = document.querySelector('.search-btn')
    var self = this

    submit.addEventListener('click', function(event){
      event.preventDefault()
      console.log(search.value);
      var searchQuery = '/search/' + search.value
      location.hash = searchQuery

    })
  },

  renderHome: function () {
    var content = document.querySelector('.content-area')
    content.innerHTML = ''
    var h1 = document.createElement('H1')
    h1.classList.add('col-md-12', 'text-center')
    h1.textContent = "Welcome my friends!"
    content.appendChild(h1)
  },


  /******************************
  * Render general-category
  ******************************/
  renderBookBySub: function (generalCategory, subCategory) {

    console.log('gen', generalCategory);
    var books = new BookCollection(subCategory || generalCategory)

    books.fetch().then(function() {
      var bookView = new BookView()
      bookView.render(books)
    })
  },

});


/******************************
* MODELS
******************************/
var BookModel = Backbone.Model.extend({

  initialize: function(sub) {
    this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + sub
  },

  url: "",

  defaults: {

  },

  parse: function(response) {

    return response.volumeInfo;
  }
});


/******************************
* COLLECTIONS
******************************/
var BookCollection = Backbone.Collection.extend({

  initialize: function(sub) {
    console.log('collection');
    this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + sub
  },

  url: "",

  model: BookModel,

  parse: function(response) {
    console.log(response.items);
    return response.items;
  }

});
