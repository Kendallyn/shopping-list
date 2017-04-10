/*In terms of user experience, your shopping list app must allow users to:

1 enter items they need to purchase by entering text and hitting "Return" or clicking the "Add item" button

2 check and uncheck items on the list by clicking the "Check" button

3 permanently remove items from the list

Hint: you may find it helpful to read up on and use the following jQuery methods: .submit(), preventDefault(), toggleClass(), and closest().
*/

'use strict'

//single state object
var state = {
    items: [{
        name: 'apple',
        checked: false
    }, {
        name: 'milk',
        checked: true
    }]
};

//functions that modify state

//adds item
function addItem(state, item) {
    state.items.push(item);
    return state.items;
}

//checks if item on the list, adds strike through or unchecks the item
function checkItem(state, itemName) {
    for (var i = 0; i < state.items.length; i++) {
        //find if itemName matches current list and check it
        if (state.items[i].name === itemName) {
            state.items[i].checked = !state.items[i].checked;
            //if item is checked, uncheck it; if not checked then check it
        }
    }
}
//if delete is clicked, remove the item from the list
function removeItem(state, itemName) {
    var itemsArray = state.items;
    var index;
    for (var i = 0; i < itemsArray.length; i++) {
        //find the item with same name as item to be deleted
        if (itemsArray[i].name === itemName) {
            index = i;
        }
    }
    //deletes the item
    itemsArray.splice(index, 1);
}

//function that render state
function renderList(state) {
    var buildTheHtmlOutput = "";

    $.each(state.items, function (itemKey, itemValue) {
        buildTheHtmlOutput += '<li>';
        if (itemValue.checked == false) {
            buildTheHtmlOutput += '<span class="shopping-item">' + itemValue.name + '</span>';
        } else {
            buildTheHtmlOutput += '<span class="shopping-item shopping-item__checked">' + itemValue.name + '</span>';
        }
        buildTheHtmlOutput += '<div class="shopping-item-controls">';
        buildTheHtmlOutput += '<button class="shopping-item-toggle">';
        buildTheHtmlOutput += '<span class="button-label">check</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '<button class="shopping-item-delete">';
        buildTheHtmlOutput += '<span class="button-label">delete</span>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</li>';
    });
    $('.shopping-list').html(buildTheHtmlOutput);
    /*for when the page loads, there is no value in the input field*/
    $('#shopping-list-entry').val('');
}

//event listeners
$(document).ready(function () {
    renderList(state);

    /*the following function call should be INSIDE the $(document).ready(function() because the targeted containers were created WHEN the page was loaded*/
    $('#js-shopping-list-form').on('submit keypress', function (event) {
        //enters text by hitting "Return" or clicking the "Add item" button
        if (event.type === 'keypress' && event.which === 13 || event.type === 'submit') {
            //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
            event.preventDefault();
            var itemName = $('#shopping-list-entry').val();
            var shoppingItem = {
                name: itemName,
                checked: false
            }
            if (itemName) {
                //this activates addItem functions
                addItem(state, shoppingItem);
                //renders the state of the list
                renderList(state);
            }
        }
    });
});


/*the following 2 function calls should be OUTSIDE the $(document).ready(function() because the targeted containers were created AFTER the page was loaded*/


/*when button class.shopping - item - toggle is clicked it will uncheck or check item*/

$('ul').on('click', 'button.shopping-item-toggle', function (event) {
    //gets the name from the item on the list that was clicked
    var itemName = $(this).closest('li').find('.shopping-item').text();
    //changes item to checked
    checkItem(state, itemName);
    //renders the new list
    renderList(state);
});

/*when button class.shopping - item - delete is clicked it will delete item*/

$('ul').on('click', 'button.shopping-item-delete', function (event) {
    var itemName = $(this).closest('li').find('.shopping-item').text();
    removeItem(state, itemName);
    //renders list again after deleting item
    renderList(state);
});
