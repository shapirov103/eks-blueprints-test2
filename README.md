# Pattern to split infra and full stacks reusing infra

`bin/infra.ts` - contains build logic to produce just the infra stack
`bin/full.ts` - reuses the infra logic to build infrastucture, adds a few addons

# How to run

```sh
npm run infra list # lists the stack for infra
npm run infra deploy # deploys infra

npm run full list # lists the full stack
npm run full deploy 
```

# Deploying

If used in a script

```sh
alias app="npm run"
app infra deploy
app full deploy
```

In a pipeline sudo code:

```
<Stage Infra>
    - deploy infra
<Stage Full>
    - deploy full
```
## Notes
After you deploy `full` you cannot run deploy `infra` anymore, otherwise it will purge the addons (if you do want to purge addons, however, it is a valid use case).

