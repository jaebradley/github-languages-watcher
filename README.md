# GitHub Languages Watcher

An naive job that looks for updates to [the `languages.yml` file](https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml) in [the `github/linguist` repository](https://github.com/github/linguist).

## Why?

I built [a NodeJS client for GitHub languages](https://github.com/jaebradley/github-languages-client) (mostly because I'm a huge nerd but also because there's not really a good way to get this information)<sup>[1](#good-way-footnote)</sup>.

What are these languages used for? You can use them for GitHub's [`Advanced Search`](https://github.com/search/advanced), for example (and the associated search API).

However, the client uses [an underlying `JSON` file](https://github.com/jaebradley/github-languages-client/blob/master/src/languages.json) to power it's API (it's essentially a thin wrapper around a `JSON` blob).

So when languages get added to the `linguist/languages.yml` file, the client's underlying `JSON` file needs to get updated as well.

## Can I Do This Manually?

It's definitely possible to manually

1. Fetch the contents of the `languages.yml` file
2. Convert to the `JSON` schema the client expects
3. Write `JSON` to `languages.json` file
4. Create a PR if `languages.json` has changed
5. Merge PR, cut a new release of the client, and publish new version to `npm`

But it's also a pain to remember to do all of these things, especially at least once a day, which is my target cadence (it'd be kind've not great if GitHub added a language to their canonical list of languages, and the client wasn't up-to-date for a week).

## So How Can I Automate This?

So the client actually uses a tool called [`semantic-release`](https://github.com/semantic-release/semantic-release) to do all the, well, release automation. So when a PR gets merged (given the correct commit message format) a new GitHub release and `npm` release will be cut as part of the `master` Travis CI job.

So I don't need to worry about step 5 (phew!)...but I still need to come up with a plan for steps 1 through 4.

## Implementation

I thought about using Heroku to run this job - and I could definitely see myself moving to Heroku in the future, but I tried implementing the job automation in Travis ([Travis has cron jobs!](https://docs.travis-ci.com/user/cron-jobs/)).

In this cron job, I do a

1. `git clone` the client repository
  * Set the author information
1. Create a new branch
1. Fetch the contents of `languages.yml`
1. Write `JSON` to `languages.json` file
1. `git diff` the file
1. If it's changed...
  * I `git add` and `git commit` the change with the appropriate `semantic-release` commit message syntax
  * I then create a PR using [the `octonode`](https://github.com/pksunkara/octonode) library
1. If it hasn't changed...do nothing!

## Tradeoffs

* The main [`script`](https://github.com/jaebradley/github-languages-watcher/blob/master/src/script.js) feels kind've gross to me - it just seems a little hacky (I guess I'm just not used to executing `git` commands programmatically).
* The entire implementation is dumb as 💩
  * It doesn't take into account existing PRs which might have identical file changes - this might lead to PR pollution
    * The reason I made this decision is that I don't expect `languages.yml` to change *that* often
    * Also, I keep a pretty close eye on GitHub notifications - I'd hope that if I'm running a daily (at its most frequent) job, I'd be able to merge the automatically generated PR pretty quickly.

## Footnotes

<ul>
  <li>
    <a name="good-way-footnote">This would be a really not great time to learn that there is an API endpoint that delivers this information...</a>
  </li>
</ul>
