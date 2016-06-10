# Xuatz Anime List 2
Rewritten in react + node.js!  
try it at https://xal.herokuapp.com/

### How to build

```
npm install
npm run dev
open http://localhost:8080
```

# Feature Roadmap

## Phase 1 - Basic Website
1. ~~Show all the animes that are airing this season in chronological order of time until airing~~ (done)
  1. Currently using dummy data for current season animes; need to fetch from db (phase 2)
1. ~~Allow user to add/remove anime from watchlist~~ (done)
  1. ~~Only persist within session; pending data storage with backend. (phase 2)~~
  1. ~~Also will involve hydrating redux store somewhere (phase 2)~~
1. ~~Dummy Stats Panel~~
  1. ~~Trending (7 days period)~~
  1. ~~Seasonal (3 months period)~~

## **_Phase 2 - Setup Parse Server + User Accounts (Completed)_**
1. ~~Deploy Parse Service with back4app~~
1. ~~Implement user accounts system with Parse sdk~~

## Phase 3 - Sync app data with database
1. ~~save and retrieve user's watchlist to/from parse database (hydrating redux store)~~
1. write an admin module for populating new anime data
  1. alternatively can use anilist.co api to fetch data?
  1. or a webcrawler
1. hydrate redux store for anime list from parse database

## Phase 4 - Global Stats
1. Display aired episodes as childrens of the "Anime" container/component
1. Show last 2 episodes by default?? Expand into last 10 episodes, click series into series dedicated page to review all episodes
1. Global Series ranking (inspired by rotten tomatoes system)

## Uncategoried Future Features
1. Anime series dedicated page
1. Add a new tab, "Browse this season anime", to facilitate adding a series into watch list.

### Breaking Issues

Nothing for now!! (I think)
