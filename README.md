<h1>Incident Management System - RESTAPI with Node.js, Mongoose & Typescript</h2>

## OVERVIEW

IMS is a Business to Business (B2B) solution  for documenting and managing service requests.

## TECHNOLOGIES

- Node.js
- MongoDB with Mongoose
- TypeScript
- Express.js & Express.js Middleware
- Zod Validation

## API

**USERS**

Users represent the representatives of the company providing products or services to the customers. An users can create, update, get and own incidents.

METHOD | ENDPOINT | ACTION
------ | -------- | ------
POST | /api/users | Create a users
POST | /api/sessions | Login users
GET | /api/users | Get complete list of users
GET | /api/users/{id} | Get the users by id
GET | /api/sessions | Get a complete list of users logged in

**CATEGORIES**

Each incident is categorized for reporting or future service routing

METHOD | ENDPOINT | ACTION
------ | -------- | ------
POST | /api/category | Create a category
GET | /api/category | Get a complete list of categories
GET | /api/category/{id} | Get information for a specific category

**CONTACTS**

A contact represents the customer reporting an incident to an agent. A contact may report several incidents to different users over time.

METHOD | ENDPOINT | ACTION
------ | -------- | ------
POST | /api/contacts | Create a contacts
GET | /api/contacts | Get a complete list of contacts
GET | /api/contacts/{id} | Get information for a specific contact
PUT | /api/contacts/{id} | Update an existing contact
DELETE | /api/contacts/{id} | Delete an existing contact

**INCIDENTS**

An incident represents a service or product issue that is having an impact on a contact. Each incident has a priority, category, status and description.

METHOD | ENDPOINT | ACTION
------ | -------- | ------
POST | /api/incident | Create a incidents
GET | /api/incident | Get a complete list of incidents
GET | /api/incident/{id} | Get information for a specific incident
PUT | /api/incident/{id} | Update or assign the users an existing incident
DELETE | /api/incident/{id} |  Delete an existing incident