<h1 align="center">
  <br>
 <img src="" alt="WAD" width="200">
  <br>
  WAD
  <br>
</h1>

<h4 align="center">Finance tracking application</h4>

> **Personal Milestone:** This is my very first React application, built when I was just starting my journey as a
> developer. Despite its architectural imperfections, it has been running in production and serving me and my friends
> daily for several years. I'm keeping the original code structure intact as a time capsule - a way to look back and see
> how far I've come in my software development journey.

<p align="center">
  <a href="#key-features">Key Features</a> • 
  <a href="#live-demo">Live Demo</a> •
  <a href="#technologies-used">Technologies used</a> •  
  <a href="#how-to-use">How To Install</a> •
</p> 

## Key Features

* Authentication (registration, login, hashed passwords);
* Authorization (account-based access control);
* Multi-wallet management;
* Recent transaction activity panel;
* Categorized expense tracking with set of default categories (Groceries, Entertainment, Utilities, Transportation,
  Others) and customizable names/icons;
* Calculator-driven transaction entry supporting description, integer & decimal values, and primary operations;
* Multi-currency support (UAH, USD, EUR, PLN, CZK, cryptocurrencies);
* Interactive visual analytics: doughnut chart for category distribution; stacked bar chart plus daily/weekly/monthly
  stats;
* Date range filtering for categories and analytics to see historical transaction data;
* Settings page with UX enhancements;
* Light dark theme selection;
* Responsive layout for all possible screen sizes;

## Live Demo

You can try the application live without installing anything:

1. Visit [wad-two.vercel.app](https://wad-two.vercel.app/)
2. Click the **Test Account** button to log in with demo data
3. Explore all features with pre-populated transactions and wallets

![Live Demo Screenshot](screenshot-placeholder.png)

*Screenshot showing the live demo interface*

## Technologies Used

### Frontend

- **React** - UI rendering library
- **MobX lite** - State manager
- **React Router DOM** - Routing
- **React Bootstrap** - UI component library
- **Chart.js & React-ChartJS-2** - Data visualization
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js & Express** - Server runtime
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing

### Performance Optimizations

Over time, this project has become a playground for implementing various performance optimizations:

- **Font Preloading** - Application fonts are preloaded to reduce layout shifts
- **Lazy Loading of React Components** - Code splitting and dynamic imports to reduce initial bundle size
- **Component Memoization** - Use of React.memo and useMemo for expensive computations
- **Bundle Analysis** - Webpack bundle analyzer for monitoring bundle size

## How To Install

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/),
and [PostgreSQL](https://www.postgresql.org/download/) installed on your computer.

### Installation Steps

```bash
# Clone this repository
$ git clone https://github.com/fedasevich/wad

# Go into the repository
$ cd wad

# Install server dependencies
$ cd server
$ npm install

# Install client dependencies
$ cd ../client
$ npm install
```

### Environment Configuration

#### Server Setup

1. Navigate to the `server` directory
2. Copy `.env.example` to `.env`:
   ```bash
   $ cp .env.example .env
   ```
3. Fill in your environment variables in `server/.env`:
   ```dotenv
   PORT=5000
   DB_NAME=your_database_name
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   SECRET_KEY='your_jwt_secret_key'
   ```

#### Client Setup

1. Navigate to the `client` directory
2. Copy `.env.example` to `.env`:
   ```bash
   $ cp .env.example .env
   ```
3. Configure the API URL in `client/.env`:
   ```dotenv
   REACT_APP_API_URL='http://localhost:5000'
   ```

### Running the Application

#### Development Mode

```bash
# Start the server (from server directory)
$ cd server
$ npm run dev

# Start the client (from client directory, in a new terminal)
$ cd client
$ npm start
```

The client will run on `http://localhost:3000` and the server on `http://localhost:5000`.