# TraderKeys

**TraderKeys** is a Sofi app aimed at incentivizing users for their knowledge and expertise in trading any asset. This is in the beta phase and works with a proof-of-sales model. Users can open sales tickets for several assets across Crypto, Agriculture, Metals, Energy, and Commodities. Currently, only the Crypto category is available.

Once a ticket is opened, the price is tracked in real-time until the user closes the ticket, and the profit or loss is calculated. Currently, only buy orders are accounted for. Users with good profits are more likely to get their keys purchased, as they would have a record history of proof of sales experience. Note: Tickets can only be opened from your particular key (account) page.

## Technologies and Design Methods

All Modals on the app were implemented by setting a URL search param to a certain value, either a boolean or an ID. This value was then tracked, and the modal was displayed based on certain conditions like the value being true or an ID set to a number. To close/cancel the modal, the path was simply reset to the initial state.

For the search feature in the accounts page, Redux was used to store user input and later read in a different component. A Global state feature. Redux was used as I am already familiar with the configurations and this will give room for any additional feature that can be added.

For the private Key custody system, once the user is authenticated, an Aptos account is created and the private key is encrypted and stored in the database. When the user needs to access this private key, he is asked to create a password which is also encrypted and stored in the database and then the privateKey is decrypted and revealed on entering this password.

## Navigation and Architecture

The HomePage is the feeds page where several cryptocurrency news is shown to the user for analysis and knowledge. To Initialize a key, the user should navigate to the profile page and click on the Initialize button and enter a preferred name for the key. To create a ticket, the user must click on the key name, either from the profile page or the accounts page. This takes the user to the key page with specific details about the key, and also an option to create a ticket for that key. Note: A user can only create a ticket for a key that was initialized by them. Multiple tickets can be created for a particular key but must have different asset names if none of the asset names in question is a closed/ended ticket. Extra functionality to sort and search through tickets would be added in further releases.

## Getting Started

To use TraderKeys, follow these steps:

1. **Initialize Key:** Navigate to the profile page, click on the "Initialize" button, and enter a preferred name for the key.
2. **Create a Ticket:** Click on the key name (from the profile page or accounts page) to access the key page. Create a ticket for the initialized key.

**Note:** Users can only create tickets for keys initialized by them.

## Visit the Web App

Explore TraderKeys on the [web app](https://trader-keys.vercel.app/).
