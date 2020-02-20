import { resolvePlaceholders } from "@atomist/automation-client/lib/configuration";
import { container } from "@atomist/sdm-core/lib/goal/container/container";
import { GoalMaker } from "@atomist/sdm-core/lib/machine/yaml/mapGoals";
import { resolvePlaceholder } from "@atomist/sdm-core/lib/machine/yaml/resolvePlaceholder";
import { StatefulPushListenerInvocation } from "@atomist/sdm/src/lib/api/dsl/goalContribution";
import { Goals } from "@atomist/sdm/src/lib/api/goal/Goals";
import * as _ from "lodash";

interface ContainerRunParameters {
    image: string;
    name?: string;
    command?: string;
    env?: string[];
}

export const ContainerRun: GoalMaker<ContainerRunParameters> = async (sdm, params) => {

    const c = container("container-run", {
        containers: [],
        callback: async (r, p, g, e, c) => {
            const paramsToUse = _.cloneDeep(params);
            await resolvePlaceholders(
                paramsToUse,
                value => resolvePlaceholder(value, e, c, {}));


            const image = paramsToUse.image;
            const name = !!paramsToUse.name ? paramsToUse.name : paramsToUse.image.split(":")[0];
            let command: string[];
            let args: string[];
            let env: Array<{ name: string, value: string }>;

            if (!!paramsToUse.command) {
                const parser = await import("yargs-parser/lib/tokenize-arg-string");
                const parts = parser(paramsToUse.command) as string[];
                command = [parts[0]];
                args = parts.slice(1).map(a => a.replace(/^"|"$|^'|'$/g, ""));
            }
            if (!!paramsToUse.env) {
                const parts = paramsToUse.env;
                env = parts.map(p => {
                    const kv = p.split("=");
                    return { name: kv[0], value: kv[1] };
                });
            }
            return {
                ...r,
                containers: [{
                    name,
                    image,
                    command,
                    args,
                    env,
                }],
            };
        },
    });

    (c.plan as any) = async (pli: StatefulPushListenerInvocation, goals: Goals) => {
        const paramsToUse = _.cloneDeep(params);
        await resolvePlaceholders(
            paramsToUse,
            value => resolvePlaceholder(value, undefined, pli, {}, false));

        const name = !!paramsToUse.name ? paramsToUse.name : paramsToUse.image.split(":")[0];

        return {
            [name]: {
                goals: {
                    details: {
                        displayName: name,
                        descriptions: {
                            planned: `Planned: ${name}`,
                            requested: `Ready: ${name}`,
                            completed: `Complete: ${name}`,
                            inProcess: `Running: ${name}`,
                            failed: `Failed: ${name}`,
                            waitingForApproval: `Approval required: ${name}`,
                            waitingForPreApproval: `Start required: ${name}`,
                            canceled: `Canceled: ${name}`,
                            stopped: `Stopped: ${name}`,
                        },
                    },
                },
            },
        };
    };

    return c;
};
