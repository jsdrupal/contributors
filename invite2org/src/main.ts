import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN || '';
    const repository = process.env.GITHUB_REPOSITORY || '';
    const username = process.env.GITHUB_ACTOR || '';
    const team_slug = process.env.TEAM_SLUG || '';

    console.log(`Add ${username} to  ${repository} into ${team_slug}`);

    const octokit = new github.GitHub(token);
    const user = await octokit.users.getByUsername({
      username
    });

    const match = repository.match('([^/]*)\/([^/]*)');
    if (match) {
      const org = match[0];
      console.log({org});
      let team_ids : Array<number> = [];
      if (team_slug) {
        const team = await octokit.teams.getByName({
          org,
          team_slug: team_slug,
        });
        team_ids.push(team.data.id);
      }

      console.log(user.data.id);
      console.log({team_ids});
      await octokit.orgs.createInvitation({
        org,
        invitee_id: user.data.id,
        team_ids,
      });
      process.exit(0);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
