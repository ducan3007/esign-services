Step by step to add new change to DB

# 1. Prepare env to make DB changes

    1.1. Start postgres locally
    1.2. cd to the project & get the latest code from the dev branch
    1.3. Update `./.env` file to point to local DB
        e.g: DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db?schema=public"
    1.4. Run `npx prisma migrate deploy` to apply all existing migrations to your local DB

# 2. Make new changes

    2.1. Update `./prisma/schema.prisma` for your changes
    2.2. Genemate a new migration with a name:
        - run a command `npx prisma migrate dev --name discription_for_your_changes --create-only`
        - check and modify the new migrations if needed
    2.3. Try to apply the new migration to local DB
        - run: npx prisma migrate deploy

# 3. Apply the new changes to dev env/ prod env

    3.1. Create a new MR for the changes
    3.2. Once the MR is approved & merged. Run the command to apply the changes to dev env
        - Update `./.env` file to point to the dev DB
            e.g: DATABASE_URL="postgresql://db:CannalS3cret@192.168.168.158:5432/db?schema=public"
        - npx prisma migrate deploy

# 4. Handle any errors

    - If you get any errors from any steps, please take a look and see why. Then try to fix it.
    - In some cases we need to delete the failed migration history in `_prisma_migrations` table.
    - Please confirm to the team if you are not sure what you are doing

And idea/ suggestions please create new MRs to update this.
Thank you!
