import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput('token');
    const repository = core.getInput('repository');
    const username = core.getInput('username');
    const team_slug = core.getInput('team_slug');

    const octokit = new github.GitHub(token);
    const user = await octokit.users.getByUsername({
      username
    });

    const match = repository.match('([^/]*)\/([^/]*)');
    if (match) {
      const org = match[0];
      let team_ids : Array<number> = [];
      if (team_slug) {
        const team = await octokit.teams.getByName({
          org,
          team_slug: team_slug,
        });
        team_ids.push(team.data.id);
      }

      await octokit.orgs.createInvitation({
        org,
        invitee_id: user.data.id,
        team_ids,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
