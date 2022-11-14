const projects = [
    {
        title: 'Social Media App',
        technologies: ['NodeJs', 'JavaScript', 'MongoDB'],
        details:
            'Yes, you may be perplexed by this point because the market is flooded with a variety of popular social platforms, and there are plenty of leaders like YouTube, Instagram, TikTok, or Twitter, but who knows, every day, we see new trends and newcomers, as everyone noticed with Clubhouse’s brief popularity and abrupt demise. With React, you can create a prototype for Instagram, Twitter, or Tumbler. The power of visuals is invaluable, and social media is where we catch and disseminate emotions online. Create a catchy and memorable UI design to captivate your consumers’ attention.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'eCommerce App',
        technologies: ['React', 'JavaScript', 'NodeJs'],
        details:
            'Ecommerce app development is a crucial step in developing your company’s content management system. ReactJS will become a commonly used technology for creating high-performing eCommerce platforms while also reducing development time and cost. You may create any type of modern app with the features of shopping cart software, such as Shopify, AliExpress, or Amazon, thanks to React’s performance and versatility.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Productivity App',
        technologies: ['ExpressJs', 'JavaScript', 'MongoDB'],
        details:
            'ReactJS can also be used to create the greatest productivity software. It might be another Calendly, Todoist, or Asana, for example. Productivity apps help with a variety of chores, from browser plugins to different services that help you maintain relationships. Productivity programs assist you in improving your performance, organizing and monitoring your daily duties or activities, keeping records or daily notes, and so forth. All of them have different purposes and useful capabilities, such as calorie counters, distraction trackers, and reminder apps. Productivity apps cover anything from browser extensions to programs that help you maintain crucial relationships.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Entertainment App',
        technologies: ['NextJs', 'JavaScript', 'MongoDB'],
        details:
            'One of the most widely used applications is entertainment software. This covers music, video, gaming, and any other media outlets or streaming services. YouTube, Spotify, and Medium are all well-known social media services. You may develop a basic logic game, like Tetris, or something more complex, like a Netflix clone, with React. Then you’ll need the react-player npm package for playing media, Gatbsy or NextJS for data processing and storage, and Typesense for enabling search by name, whether it’s a movie, track, or book.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Blog',
        technologies: ['React', 'JavaScript'],
        details:
            'We’ve already mentioned blogs in this post, but it has to be put here as well. Another method to properly employ React technology is to create a simple CMS for blogging. For a service like Wix, React is merely an option. By the way, we recently published a comprehensive guide on how to create a React CMS for a blog. You can try to construct your store with Sanity.io by default, but building your content management platform with a web app builder is faster.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Dating App',
        technologies: ['ExpressJs', 'JavaScript', 'MongoDB'],
        details:
            'Tinder is still the most popular dating app in the United States, according to the US dating app Market. Tinder is used by over 7.8 million people every month; the majority of them are between the ages of 21 and 44. Yes, establishing your own dating app appears daunting and perhaps excessively ambitious, but you can begin by developing your own CMS for an app like Tinder.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Instant Messaging App',
        technologies: ['React', 'JavaScript', 'NodeJs'],
        details:
            'You may make a chat application as one of your React project ideas. Any messaging software that has a sender and a receiver is a type of chat application. You can, however, create a video chat app or any other type of live chat. ChatRoulette is the first chat program that comes to mind, and its UI was also created with Reactjs. You might probably recall Facebook Messenger or Slack, which is well-known in the IT field and among software professionals. Take a look at our comprehensive step-by-step tutorial on how to create a React chat app.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Books Application',
        technologies: ['NextJs', 'JavaScript', 'MongoDB'],
        details:
            'You can design an app for managing your reading flow, similar to Goodreads, an American cataloging website for book enthusiasts. Libib, for example, is a library management program that assists you in cataloging your favorite media such as books, music, films, and games. What is the definition of a standard book app? It’s like a catalog/library or a content management system, with a list of books under the currently-reading, to-read, and already-read tabs, as well as a search bar.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Money Tracker',
        technologies: ['ExpressJs', 'JavaScript', 'MongoDB'],
        details:
            'You’ve probably heard of Quickbooks and Expensify. The final is arguably the most popular since it appeals to a broader audience and is more than just another budget tracker or bookkeeping application; it’s a whole system for documenting and managing your finances. This type of app is typically used to solve business problems like real-time reporting, invoicing, and so on, though you may create your own simplified budget tracker with React.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Fitness App',
        technologies: ['NodeJs', 'JavaScript', 'MongoDB'],
        details:
            'Track your daily sports successes using an app like a fitness tracker or workout tracker, which can be simply built with React, Firebase, and Google Material UI components, for example. The main principles and methods for developing a sports app are the same:',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Language Learning App',
        technologies: ['NextJs', 'JavaScript', 'MongoDB'],
        details:
            'Knowing a foreign language will assist you in getting hired and advancing your career. and Declare the data type of variables with React, CSS, and Typescript to make the greatest language-learning app. Start with a simple word insertion or matching term exercise that requires you to drag and drop components.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'ToDo App',
        technologies: ['React', 'JavaScript', 'NodeJs'],
        details:
            'For those who are just getting started with programming, the ToDo app is a great idea for a React project. You don’t need Redux or MobX as side libraries. We’ll use React to create a To-Do application, as the title suggests. Expect no surprises when using a state management library like Flux or Redux to handle a state. I promise it will be entirely React-based. We may use something like Redux in future articles, but for now, we want to focus on React and make sure everyone is comfortable with it.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Music App',
        technologies: ['ExpressJs', 'JavaScript', 'MongoDB'],
        details:
            'Just one more Dezeer or Spotify project for your portfolio may be your next React project. For example, it might be turned into a NextJS project using Firebase Cloud as a library, Firestore as a database for creating hierarchical data structures, and Lucidworks or Algolia as a search engine.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Sleeping Tracker App',
        technologies: ['React', 'JavaScript', 'NodeJs'],
        details:
            'A sleep habit tracker is a simple and effective React project. The goal is to keep note of how long you sleep when you wake up and how long you sleep. Any sleep entries can be added, edited, or removed by users. For the front end, you might require React, HTML, and CSS; for the backend, you might need Java, C#, or even Node.JS; and for the database, you might need PostgreSQL or MySQL.',
        timezone: 'UTC+01:00',
    },
    {
        title: 'Quiz Application',
        technologies: ['JavaScript'],
        details:
            'Another suggestion for your next project is a ReactJS quiz app. This type of software won’t break the bank, but it will demand an understanding of TypeScript, useState hooks, React components, and other similar concepts. PluralSight has comprehensive instruction on how to create a quiz. However, before plunging into the programming process, take our quiz with the top 20 React questions to test your fundamental theoretical knowledge and determine your skill level.',
        timezone: 'UTC+01:00',
    },
]

export default projects
