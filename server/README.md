**Get Property Details**
----
  <_Given a propertyId, fetch details for that given property_>

* **URL**

  - `/api/details/:propertyId`

* **Method:**
  
  - `GET`

*  **URL Params**

   - **Required:**
      `propertyId=[integer]`

* **Success Response:**

  * **Code:** 200
    **Sample Content:** 
    ```
    [
        {
            "id": 5,
            "name": "3910 Ryan Trail",
            "price": 28973149,
            "bed_count": 26,
            "bath_count": 4,
            "sq_ft": 26054,
            "createdAt": "2019-02-26T23:50:53.000Z",
            "updatedAt": "2019-02-26T23:50:53.000Z"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/details/5', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(json => console.log(json))
    ```
**Get Property Photos**
----
  <_Given a propertyId, fetch urls to photos of that given property_>

* **URL**

  - `/api/photos/:propertyId`

* **Method:**
  
  - `GET`

*  **URL Params**

   - **Required:**
      `propertyId=[integer]`

* **Success Response:**

  * **Code:** 200
    **Sample Content:** 
    ```
    [
        {
            "url": "https://s3-us-west-1.amazonaws.com/xillow-talk-photos/property_photos/large52.jpg"
        },
        {
            "url": "https://s3-us-west-1.amazonaws.com/xillow-talk-photos/property_photos/sample85.jpg"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/photos/5', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(json => console.log(json))
    ```
**Add Property**
----
  <_Given property information, add new property with given information_>

* **URL**

  - `/api/details/`

* **Method:**
  
  - `POST`

*  **Body Params**

   - **Required:**
      `details=[json]`

* **Success Response:**

  * **Code:** 201
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/details', {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(data)
    })
    ```
**Add Property Photos**
----
  <_Given a propertyId and a url, add url to that given property's list of photos_>

* **URL**

  - `/api/photos/:propertyId/:url`

* **Method:**
  
  - `POST`

*  **URL Params**

   - **Required:**
      `propertyId=[integer]`

* **Body Params**

    - **Required:**
      `url=[string]`

* **Success Response:**

  * **Code:** 201
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/photos/5', {
        method: 'POST',
        contentType: 'text/plain',
        body: url
    })
    ```
**Update Property Information**
----
  <_Given a propertyId and details, update that property's information_>

* **URL**

  - `/api/details/:propertyId`

* **Method:**
  
  - `PUT`

*  **URL Params**

   - **Required:**
      `propertyId=[integer]`

* **Body Params**

    - **Required:**
      `details=[json]`

* **Success Response:**

  * **Code:** 204
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/details/5', {
        method: 'PUT',
        contentType: 'application/json',
        body: JSON.stringify(data)
    })
    ```
**Delete Property**
----
  <_Given a propertyId, delete that property_>

* **URL**

  - `/api/details/:propertyId`

* **Method:**
  
  - `DELETE`

*  **URL Params**

   - **Required:**
      `propertyId=[integer]`

* **Success Response:**

  * **Code:** 204
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/details/5', {
        method: 'DELETE'
    })
    ```
**Delete Property Photos**
----
  <_Given a propertyId, delete that property's photos_>

* **URL**

  - `/api/photos/:propertyId`

* **Method:**
  
  - `DELETE`

*  **URL Params**

   - **Required:**
      `propertyId=[integer]`

* **Success Response:**

  * **Code:** 204
 
* **Error Response:**

  * **Code:** `404 NOT FOUND`
    **Content:** `{ error : "" }`

* **Sample Call:**
    ```
    fetch('/api/photos/5', {
        method: 'DELETE'
    })
    ```
