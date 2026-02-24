        Question-1 
1. getElementById is basically used to select an unique element by using id. The id must be unique. As it is an unique selector, getELementById returns a single element.

2. getElementsByClassName is used to select all the elements with same class name. It returns live HTMLCollection.

3. querySelector is CSS selector meaning if it is used then for class then '.(dot)' should be used before class name and if querySelector is used to select id then '#' should be used before id name inside the querySelector. It returns the first matching element.

4. querySelectorAll is also a CSS selector. It returns a static NodeList of all matching element. forEach() can be used to access elements.


       Question-2
To create and insert a new element into the DOM-

document.createElement() should be used. Example: const heading = document.createElement("h1");
Then innerText should be used to add text. Example: heading.innerText = "Hello World";
To add a class: heading.classList.add("heading-text")
Then the element should be added to the desired section. Example: document.body.appendChild(heading);


     Question-3
Event bubbling means a way of event propagation. When an event happens on an element event bubbles up from the target element to its ancestors through parents.


     Question-4
Event Delegation is a technique to attach event listener to a parent instead of various childs. The parent element handles events of child elements by bubbling. 
<!-- Benefits of Event Delegation -->
1. It can reduce the number of event listener. Instead of adding event listener in every child only one event listener can be added to the parent element.

2. Can handle dynamically added element


       Question-5
preventDefault() prevents the default action of browsers taking on that event. Example: Stopping form submission.
On the other hand, stopPropagation() prevents further propagation or bubbling. Example: If there is a event listener in two buttons
then stopPropagation() will stop bubbling up to its ancestor or its parent. 
