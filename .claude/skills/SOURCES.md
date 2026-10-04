# Vendored skills

690 Claude Code skills copied from the upstream repos below (only each repo's canonical skill folders; translations, editor-specific copies, tests and demo media were left out). Each folder without its own license carries the upstream license as `LICENSE.upstream`.

When two repos used the same skill name, the later one is prefixed (e.g. `caveman-review`, `mattpocock-code-review`).

Not vendored: `garrytan/gstack` (must be installed at `~/.claude/skills/gstack` and run `./setup`), `msitarzewski/agency-agents` (subagents, not skills), `nexu-io/html-anything` (app templates), `Jakubantalik/thinking-orbs` (UI component library), `anthropics/claude-plugins-official` external channel plugins (need their MCP servers).

To update a repo, re-copy its skill folders from upstream.

## [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 25

`addy-test-driven-development`, `api-and-interface-design`, `browser-testing-with-devtools`, `ci-cd-and-automation`, `code-review-and-quality`, `code-simplification`, `constraint-driven-development`, `context-engineering`, `debugging-and-error-recovery`, `deprecation-and-migration`, `documentation-and-adrs`, `doubt-driven-development`, `frontend-ui-engineering`, `git-workflow-and-versioning`, `idea-refine`, `incremental-implementation`, `interview-me`, `observability-and-instrumentation`, `performance-optimization`, `planning-and-task-breakdown`, `security-and-hardening`, `shipping-and-launch`, `source-driven-development`, `spec-driven-development`, `using-agent-skills`

## [affaan-m/ECC](https://github.com/affaan-m/ECC) — 293

`accessibility`, `agent-architecture-audit`, `agent-eval`, `agent-harness-construction`, `agent-introspection-debugging`, `agent-payment-x402`, `agent-self-evaluation`, `agent-sort`, `agentic-engineering`, `agentic-os`, `ai-first-engineering`, `ai-regression-testing`, `android-clean-architecture`, `angular-developer`, `api-connector-builder`, `api-design`, `architecture-decision-records`, `article-writing`, `automation-audit-ops`, `autonomous-agent-harness`, `autonomous-loops`, `backend-patterns`, `benchmark`, `benchmark-methodology`, `benchmark-optimization-loop`, `blender-motion-state-inspection`, `blueprint`, `brand-discovery`, `brand-voice`, `browser-qa`, `bun-runtime`, `canary-watch`, `carrier-relationship-management`, `cisco-ios-patterns`, `ck`, `claude-devfleet`, `click-path-audit`, `clickhouse-io`, `code-tour`, `codebase-onboarding`, `codehealth-mcp`, `coding-standards`, `competitive-platform-analysis`, `competitive-report-structure`, `compose-multiplatform-patterns`, `config-gc`, `configure-ecc`, `connections-optimizer`, `content-engine`, `content-hash-cache-pattern`, `context-budget`, `continuous-agent-loop`, `continuous-learning`, `continuous-learning-v2`, `contract-first`, `cost-aware-llm-pipeline`, `cost-tracking`, `council`, `council-multi-model`, `counterparty-channel-discipline`, `cpp-coding-standards`, `cpp-testing`, `crosspost`, `csharp-testing`, `customer-billing-ops`, `customs-trade-compliance`, `dart-flutter-patterns`, `dashboard-builder`, `data-scraper-agent`, `data-throughput-accelerator`, `database-migrations`, `deep-research`, `defi-amm-security`, `delivery-gate`, `deployment-patterns`, `design-system`, `dev-team`, `django-celery`, `django-patterns`, `django-security`, `django-tdd`, `django-verification`, `dmux-workflows`, `docker-patterns`, `documentation-lookup`, `dotnet-patterns`, `dynamic-workflow-mode`, `e2e-testing`, `ecc-guide`, `ecc-recipes`, `ecc-tools-cost-audit`, `email-ops`, `energy-procurement`, `enterprise-agent-ops`, `error-handling`, `esign-field-placement`, `eval-harness`, `evm-token-decimals`, `exa-search`, `fal-ai-media`, `fastapi-patterns`, `finance-billing-ops`, `flox-environments`, `flutter-dart-code-review`, `foundation-models-on-device`, `frontend-a11y`, `frontend-design-direction`, `frontend-patterns`, `frontend-slides`, `fsharp-testing`, `gan-style-harness`, `gateguard`, `generating-python-installer`, `git-workflow`, `github-ops`, `golang-patterns`, `golang-testing`, `google-workspace-ops`, `growth-log`, `healthcare-cdss-patterns`, `healthcare-emr-patterns`, `healthcare-eval-harness`, `healthcare-phi-compliance`, `hermes-imports`, `hexagonal-architecture`, `hipaa-compliance`, `homelab-network-readiness`, `homelab-network-setup`, `homelab-pihole-dns`, `homelab-vlan-segmentation`, `homelab-wireguard-vpn`, `hookify-rules`, `i18n-sync`, `inherit-legacy-style`, `intent-driven-development`, `inventory-demand-planning`, `investor-materials`, `investor-outreach`, `ios-icon-gen`, `iterative-retrieval`, `ito-baskets`, `ito-compute`, `ito-inference`, `ito-training`, `java-coding-standards`, `jira-integration`, `jpa-patterns`, `knowledge-ops`, `kotlin-coroutines-flows`, `kotlin-exposed-patterns`, `kotlin-ktor-patterns`, `kotlin-patterns`, `kotlin-testing`, `kubernetes-patterns`, `laravel-patterns`, `laravel-plugin-discovery`, `laravel-security`, `laravel-tdd`, `laravel-verification`, `latency-critical-systems`, `lead-intelligence`, `liquid-glass-design`, `living-docs-governance`, `llm-trading-agent-security`, `logistics-exception-management`, `loop-design-check`, `mailtrap-email-integration`, `make-interfaces-feel-better`, `manim-video`, `market-research`, `marketing-campaign`, `master-agreement-generator`, `mcp-server-patterns`, `messages-ops`, `ml-adoption-playbook`, `mle-workflow`, `motion-advanced`, `motion-foundations`, `motion-patterns`, `mysql-patterns`, `nanoclaw-repl`, `nasiko-control-plane`, `nestjs-patterns`, `netmiko-ssh-automation`, `network-bgp-diagnostics`, `network-config-validation`, `network-interface-health`, `nextjs-turbopack`, `nodejs-keccak256`, `nutrient-document-processing`, `nuxt4-patterns`, `openclaw-persona-forge`, `opensource-pipeline`, `operator-approval-loop`, `orch-add-feature`, `orch-build-mvp`, `orch-change-feature`, `orch-fix-defect`, `orch-pipeline`, `orch-refine-code`, `parallel-execution-optimizer`, `perl-patterns`, `perl-security`, `perl-testing`, `plan-canvas`, `plan-orchestrate`, `plankton-code-quality`, `postgres-patterns`, `prediction-market-oracle-research`, `prediction-market-risk-review`, `prisma-patterns`, `product-capability`, `product-lens`, `production-audit`, `production-scheduling`, `project-flow-ops`, `prompt-optimizer`, `python-patterns`, `python-testing`, `pytorch-patterns`, `quality-nonconformance`, `quarkus-patterns`, `quarkus-security`, `quarkus-tdd`, `quarkus-verification`, `rails-patterns`, `ralphinho-rfc-pipeline`, `react-native-patterns`, `react-patterns`, `react-performance`, `react-testing`, `recsys-pipeline-architect`, `recursive-decision-ledger`, `redis-patterns`, `regex-vs-llm-structured-text`, `remotion-video-creation`, `repo-scan`, `research-ops`, `returns-reverse-logistics`, `rules-distill`, `rust-patterns`, `rust-testing`, `safety-guard`, `santa-method`, `scientific-db-pubmed-database`, `scientific-db-uspto-database`, `scientific-pkg-gget`, `scientific-thinking-literature-review`, `scientific-thinking-scholar-evaluation`, `search-first`, `security-bounty-hunter`, `security-review`, `security-scan`, `seo`, `skill-comply`, `skill-scout`, `skill-stocktake`, `social-graph-ranker`, `social-publisher`, `springboot-patterns`, `springboot-security`, `springboot-tdd`, `springboot-verification`, `strategic-compact`, `swift-actor-persistence`, `swift-concurrency-6-2`, `swift-protocol-di-testing`, `swiftui-patterns`, `taste`, `taste-application`, `taste-distillation`, `tasteforge-video`, `tdd-workflow`, `team-agent-orchestration`, `team-builder`, `terminal-opener`, `terminal-ops`, `tinystruct-patterns`, `token-budget-advisor`, `ui-demo`, `ui-to-vue`, `uncloud`, `unified-memory`, `unified-notifications-ops`, `verification-loop`, `video-editing`, `videodb`, `visa-doc-translate`, `vite-patterns`, `vue-patterns`, `windows-desktop-e2e`, `workspace-surface-audit`, `x-api`

## [AgriciDaniel/claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian) — 15

`autoresearch`, `canvas`, `claude-obsidian-defuddle`, `claude-obsidian-obsidian-bases`, `claude-obsidian-obsidian-markdown`, `save`, `think`, `wiki`, `wiki-cli`, `wiki-fold`, `wiki-ingest`, `wiki-lint`, `wiki-mode`, `wiki-query`, `wiki-retrieve`

## [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) — 1

`huashu-design`

## [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — 23

`agent-development`, `build-mcp-app`, `build-mcp-server`, `build-mcpb`, `cardputer-buddy`, `claude-automation-recommender`, `claude-md-improver`, `claude-security`, `command-development`, `hook-development`, `m5-onboard`, `math-olympiad`, `mcp-integration`, `playground`, `plugin-settings`, `plugin-structure`, `project-artifact`, `receipts`, `session-report`, `siege`, `skill-development`, `solo`, `writing-hookify-rules`

## [anthropics/defending-code-reference-harness](https://github.com/anthropics/defending-code-reference-harness) — 9

`customize`, `defending-code-triage`, `dnr-hunt`, `dnr-respond`, `patch`, `quickstart`, `threat-model`, `verify`, `vuln-scan`

## [anthropics/skills](https://github.com/anthropics/skills) — 19

`academy-guide`, `algorithmic-art`, `brand-guidelines`, `canvas-design`, `claude-api`, `discernment-nudge`, `doc-coauthoring`, `docx`, `frontend-design`, `internal-comms`, `mcp-builder`, `pdf`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing`, `xlsx`

## [beshuaxian/higgsfield-seedance2-jineng](https://github.com/beshuaxian/higgsfield-seedance2-jineng) — 15

`seedance-3d-cgi`, `seedance-anime-action`, `seedance-brand-story`, `seedance-cartoon`, `seedance-cinematic`, `seedance-comic-to-video`, `seedance-ecommerce-ad`, `seedance-fashion-lookbook`, `seedance-fight-scenes`, `seedance-food-beverage`, `seedance-motion-design-ad`, `seedance-music-video`, `seedance-product-360`, `seedance-real-estate`, `seedance-social-hook`

## [bradautomates/claude-video](https://github.com/bradautomates/claude-video) — 1

`watch`

## [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) — 1

`diagram-design`

## [chaseai-yt/claudex-loop](https://github.com/chaseai-yt/claudex-loop) — 4

`claudex-loop`, `claudex-route`, `codex-build`, `codex-review`

## [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill) — 1

`excalidraw-diagram`

## [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — 50

`ab-testing`, `ad-creative`, `ads`, `ai-seo`, `analytics`, `aso`, `attribution`, `churn-prevention`, `co-marketing`, `cold-email`, `community-marketing`, `competitor-profiling`, `competitors`, `content-strategy`, `copy-editing`, `copywriting`, `cro`, `customer-research`, `directory-submissions`, `emails`, `events`, `free-tools`, `image`, `influencer-marketing`, `launch`, `lead-magnets`, `marketing-council`, `marketing-loops`, `marketing-plan`, `marketing-psychology`, `mkt-marketing-ideas`, `offers`, `onboarding`, `paywalls`, `popups`, `pricing`, `product-marketing`, `programmatic-seo`, `prospecting`, `public-relations`, `referrals`, `revops`, `sales-enablement`, `schema`, `seo-audit`, `signup`, `site-architecture`, `sms`, `social`, `video`

## [cth9191/cloneify](https://github.com/cth9191/cloneify) — 1

`cloneify`

## [cth9191/scroll-world](https://github.com/cth9191/scroll-world) — 1

`scroll-world`

## [cth9191/site-clone](https://github.com/cth9191/site-clone) — 4

`clone-site`, `dom-clone`, `remix-site`, `shader-extract`

## [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) — 6

`ponytail`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help`, `ponytail-review`

## [diffusionstudio/lottie](https://github.com/diffusionstudio/lottie) — 1

`text-to-lottie`

## [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs) — 1

`img2threejs`

## [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — 22

`cavecrew`, `caveman`, `caveman-commit`, `caveman-compress`, `caveman-discover`, `caveman-evidence-review`, `caveman-explore`, `caveman-help`, `caveman-learn`, `caveman-manage`, `caveman-optimize`, `caveman-review`, `caveman-setup`, `caveman-stats`, `investigate-first`, `lean-build`, `megacave`, `migration`, `safe-refactor`, `surgical-patch`, `ultracave`, `verify-and-stop`

## [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — 6

`defuddle`, `json-canvas`, `knap`, `obsidian-bases`, `obsidian-cli`, `obsidian-markdown`

## [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — 13

`brandkit`, `design-taste-frontend`, `design-taste-frontend-v1`, `full-output-enforcement`, `gpt-taste`, `high-end-visual-design`, `image-to-code`, `imagegen-frontend-mobile`, `imagegen-frontend-web`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `stitch-design-taste`

## [mattpocock/skills](https://github.com/mattpocock/skills) — 31

`ask-matt`, `codebase-design`, `diagnosing-bugs`, `domain-modeling`, `git-guardrails-claude-code`, `grill-me`, `grill-with-docs`, `grilling`, `handoff`, `implement`, `implement-spec`, `improve-codebase-architecture`, `mattpocock-code-review`, `mattpocock-retro`, `migrate-to-shoehorn`, `pr`, `prototype`, `research`, `scaffold-exercises`, `setup-matt-pocock-skills`, `setup-pre-commit`, `tdd`, `teach`, `to-questionnaire`, `to-spec`, `to-tickets`, `triage`, `wait-what`, `wayfinder`, `wizard`, `writing-for-agents`

## [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) — 1

`last30days`

## [Nutlope/hallmark](https://github.com/Nutlope/hallmark) — 1

`hallmark`

## [obra/superpowers](https://github.com/obra/superpowers) — 15

`brainstorming`, `diagnosing-superpowers`, `dispatching-parallel-agents`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`, `requesting-code-review`, `subagent-driven-development`, `systematic-debugging`, `test-driven-development`, `using-git-worktrees`, `using-superpowers`, `verification-before-completion`, `writing-plans`, `writing-skills`

## [oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) — 1

`oil-motion`

## [op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) — 1

`guizang-ppt-skill`

## [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc) — 3

`codex-cli-runtime`, `codex-result-handling`, `gpt-5-4-prompting`

## [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) — 1

`agent-reach`

## [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — 1

`impeccable`

## [phuryn/pm-skills](https://github.com/phuryn/pm-skills) — 69

`ab-test-analysis`, `analyze-feature-requests`, `ansoff-matrix`, `beachhead-segment`, `brainstorm-experiments-existing`, `brainstorm-experiments-new`, `brainstorm-ideas-existing`, `brainstorm-ideas-new`, `brainstorm-okrs`, `business-model`, `code-review`, `cohort-analysis`, `competitive-battlecard`, `competitor-analysis`, `create-prd`, `customer-journey-map`, `draft-nda`, `dummy-dataset`, `grammar-check`, `growth-loops`, `gtm-motions`, `gtm-strategy`, `ideal-customer-profile`, `identify-assumptions-existing`, `identify-assumptions-new`, `intended-vs-implemented`, `interview-script`, `job-stories`, `lean-canvas`, `market-segments`, `market-sizing`, `marketing-ideas`, `metrics-dashboard`, `monetization-strategy`, `north-star-metric`, `opportunity-solution-tree`, `outcome-roadmap`, `pestle-analysis`, `porters-five-forces`, `positioning-ideas`, `pre-mortem`, `pricing-strategy`, `prioritization-frameworks`, `prioritize-assumptions`, `prioritize-features`, `privacy-policy`, `product-name`, `product-strategy`, `product-vision`, `release-notes`, `retro`, `review-resume`, `sentiment-analysis`, `shipping-artifacts`, `sprint-plan`, `sql-queries`, `stakeholder-map`, `startup-canvas`, `strategy-red-team`, `summarize-interview`, `summarize-meeting`, `swot-analysis`, `test-scenarios`, `user-personas`, `user-segmentation`, `user-stories`, `value-prop-statements`, `value-proposition`, `wwas`

## [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) — 40

`accessibility-wcag`, `agentkit-seo`, `api-design-patterns`, `authentication-patterns`, `aws-cloud-patterns`, `ci-cd-pipelines`, `claude-memory-kit`, `data-engineering`, `database-optimization`, `deep-dive`, `devops-automation`, `docker-best-practices`, `frontend-excellence`, `git-advanced`, `golang-idioms`, `graphql-design`, `kubernetes-operations`, `llm-integration`, `manage-skills`, `mcp-development`, `microservices-design`, `mobile-development`, `monitoring-observability`, `nextjs-mastery`, `postgres-optimization`, `prompt-engineering`, `python-best-practices`, `rust-systems`, `security-hardening`, `styleseed`, `tdd-mastery`, `testing-strategies`, `toolkit-continuous-learning`, `toolkit-django-patterns`, `toolkit-performance-optimization`, `toolkit-react-patterns`, `toolkit-redis-patterns`, `toolkit-springboot-patterns`, `typescript-advanced`, `websocket-realtime`

## [shadcn/improve](https://github.com/shadcn/improve) — 1

`improve`

## [slavingia/skills](https://github.com/slavingia/skills) — 10

`company-values`, `find-community`, `first-customers`, `grow-sustainably`, `minimalist-review`, `mvp`, `processize`, `slavingia-marketing-plan`, `slavingia-pricing`, `validate-idea`

## [teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py) — 1

`notebooklm`

## [tt-a1i/archify](https://github.com/tt-a1i/archify) — 1

`archify`

## [yizhiyanhua-ai/fireworks-tech-graph](https://github.com/yizhiyanhua-ai/fireworks-tech-graph) — 1

`fireworks-tech-graph`
