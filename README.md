**Project Title:** AmirKabir University Scientific Chapter - Event Management Platform (Frontend)

**1. Introduction**

This is the frontend application for the AmirKabir University Scientific Chapter's Event Management Platform. It provides a responsive and interactive user interface for students and members to engage with events, presentations, and competitions offered by the chapter. This application communicates with the backend Django REST API to fetch data and perform user actions.

**2. Key Features (User Interface & Experience)**

* **User Authentication:**
    * Secure Login, Registration, and Email Verification (6-digit code) pages.
    * User Profile management (view/edit details, upload profile picture).
    * Simplified "Forgot Password" flow (receives a 6-digit temporary password via email).
* **Event Discovery & Browsing:**
    * Dynamic listing of current and upcoming events.
    * Detailed views for Events, Presentations (talks/workshops), Solo Competitions, standard Group Competitions, and Verified Group Competitions.
    * Clear indication of online/offline activities and free/paid status.
* **Activity Engagement:**
    * Direct enrollment/registration for free presentations and solo competitions.
    * **Team Management for Group Competitions:**
        * **Standard Groups:** Intuitive form for leaders to create teams and list member emails.
        * **Verified Groups:** Step-by-step process for leaders to submit team details, including a secure file upload interface for each member's Government ID picture.
        * Clear display of team status (e.g., pending admin verification, approved, rejected).
* **Shopping Cart & Checkout:**
    * Interactive shopping cart to add multiple paid items (presentations, solo competition fees, team fees for group/verified competitions).
    * Functionality to apply discount codes and see updated totals.
    * Smooth transition to a checkout summary page.
* **Payment Process:**
    * Seamless redirection to the Zarinpal payment gateway for completing payments.
    * User-friendly pages to display payment success or failure based on the callback from Zarinpal.
* **User Dashboard:**
    * Personalized view of "Upcoming Activities" (enrolled presentations and registered competitions).
    * Access to past order history.
* **Responsive Design:** Optimized for various screen sizes (desktop, tablet, mobile).
