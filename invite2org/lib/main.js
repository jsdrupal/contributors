"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput('token');
            const repository = core.getInput('repository');
            const username = core.getInput('username');
            const team_slug = core.getInput('team_slug');
            const octokit = new github.GitHub(token);
            const user = yield octokit.users.getByUsername({
                username
            });
            const match = repository.match('([^/]*)\/([^/]*)');
            if (match) {
                const org = match[0];
                let team_ids = [];
                if (team_slug) {
                    const team = yield octokit.teams.getByName({
                        org,
                        team_slug: team_slug,
                    });
                    team_ids.push(team.data.id);
                }
                yield octokit.orgs.createInvitation({
                    org,
                    invitee_id: user.data.id,
                    team_ids,
                });
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
