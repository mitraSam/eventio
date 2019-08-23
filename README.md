# eventio

Eventio App

done:

Authentication:

enabled by Login and SignUp components
users can log in, log out, and non-users can sign up
a authentication token is used to manage user session and protected routes
the user object is hooked with redux for shared state between components

Events:
available only to logged in users, the apps events are displayed
users can join or leave events
users can also create new events
the events array is hooked with redux for shared state between components

to be done:

Form Class refactoring -- implement formik for login, signup && eventmodal components !!!

Testing:

implement testing for:
form validation functionality
redux actions
util functions

This should be treated as a priority in order to ensure a harmonious
and persistent development process

Reset password:

this could be a component which renders a form that allows users to update
their password
it could extend the FormClass for form validation functionality
it could be wrapped by PageLayout component to be displayed persistently
according with layout design
it could be wrapped with the WithCurrentUser container to provide redux
actions and state like currentUser,setUser and apiError

My Profile:
this could be a component which renders a page that displays the users
events: events that the user has created or that he has joined
the Events components could be modified to be a wrapper which
would render user specific events or all events depending from current route
it could be hooked with redux for currentUser and events functionality
and props

Event Details:

this component would be similar with EventCard component meaning it could
get all the event details from the events array and the join/leave functionality
from the Events component
I don't think this one needs to be hooked with redux

Optimization:

Right now the main bundle is a little over 1Mb according to webpack bundle
analyzer. The minified version which is the one being server is aprox 550 Kb.
That is still too much, the compressed version should be no more than 200 kb,
which is acceptable according to webpack standards. I tried to add compression
to the express server but the served content is not getting compressed. I'm really
curious if/what the problem might be and what other solutions do you think there are to optimize
the apps loading speed.

Implementation detaisl:

scripts:

build: for bundling the app in production mode
dev: for starting the app in development mode, it starts webpack-dev-server with hot reloading enabled
lint:fix: lint the js/jsx code

pre-commit hooks:
prettier is run pre-commit on staged files

Components:

App component:

Wraps AppRoutes component with redux provider and and browserrouter

AppRoutes component:

renders a Switch component that holds all the app routes
hooked to redux with currentUser prop
enables protected routes by displaying or redirecting routes according with
currentUser value

AsyncRoutes component:


enables webpack to perform code splitting by dynamically loading component
only when corresponding route is visited
when component is loaded it renders it, otherwise renders a placeholder according
to path prop

EventCard component:
displays each event in the form of a card preview according to design
rendered on Events component

EventModal component:

renders a form that allows creation of new event
rendered form has validation functionality and triggers api call
hooked to redux with events prop
if creation is unsuccessful from the server side it display the apiError
or serverError props
on successful event creation the createEvent() action is dispatched with
the newly created event which updates the events prop

Events component:

renders the events page which displays all events by rendering them using
the EventCard component
events can be filtered by time and displayed in column or rows layouts
hooked to redux with events component
contains functionality required for user to join or leave event

FormClass component:

extended by Login,SignUp and EventModal components
holds form validation functionality

MainHeader component:
renders the apps main header
hooked to redux with currentUser prop
renders accordingly to currentUser value
allows user to log out by dispatching logout() function which
trigger the currentUser reducer with an empty object and removes token
from loacalStorage

PageLayout component:

wraps Login, SignUp, On404, ErrorDisplay components and displays them
according to design

SignUp component:
renders a form that allows creation of new user
rendered form has validation functionality and triggers api call
hooked to redux with currentUser, errorServer and apiError props
if creation is unsuccessful from the server side it display the apiError
or serverError props
on successful user creation the setUser() action is dispatched with
the newly created user which logs the new user in, saves the authentication
token in localStorage and updates the currentUser prop

Login component:
renders a form that allows logging in of actual user
rendered form has validation functionality and triggers api call
hooked to redux with currentUser, errorServer and apiError props
if creation is unsuccessful from the server side it display the apiError
or serverError props
on successful user log in, the setUser() action is dispatched with
the user, which logs the user in, saves the authentication
token in localStorage and updates the currentUser prop

WithCurrentUser container:
wraps Login,SignUp and MainHeader components and provides them
default currentUser specific state and functions hooked with redux

WithCurrentEvents container
wraps Events component and provides it with
default event specific state and function hooked with redux
