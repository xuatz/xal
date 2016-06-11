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
1. ~~Allow user to add/remove anime from watchlist~~ (done)
  1. ~~Only persist within session; pending data storage with backend. (phase 2)~~
  1. ~~Also will involve hydrating redux store somewhere (phase 2)~~
1. ~~Dummy Stats Panel~~
  1. ~~Trending (7 days period)~~
  1. ~~Seasonal (3 months period)~~

## Phase 2 - Setup Parse Server + User Accounts
1. ~~Deploy Parse Service with back4app~~
1. ~~Implement user accounts system with Parse~~

## Phase 3 - Sync app data with database
1. ~~save and retrieve user's watchlist to/from parse database (hydrating redux store)~~
1. ~~Retrieve anime list from database~~
1. Retrieve episode list from database
1. Display aired episodes as childrens of the "Anime" container/component

## Phase 4 - Episode Review Functionality
1. Capture user review
1. Allow for undo

## Phase 5 - Global Statistics
1. Amount of people watching a certain series.
1. Amount of thumbs up and down for each series in the past week.
1. Total amount of thumbs up and down for each series (seasonal stats)

## Phase 6 - Improve anime list population strategy
1. WIP

## Phase 7 - Improve episode list population strategy
1. WIP

## Uncategoried Future Features
1. Anime series dedicated page
1. Add a new tab, "Browse this season anime", to facilitate adding a series into watch list.
1. More stats

### Breaking Issues

Nothing for now!! (I think)
