alias i := install

alias f := format

alias r := run

alias a := add  

alias b := build

alisa d := deploy

alias g := generate

install:
	pnpm install

format:
	bun run format

run:
	bun run dev

build:
	pnpm build

clean:
	bun run clean

lint:
	bun run lint

deploy:
	docker context use default 
	docker buildx build --platform linux/amd64 -t registry.ap-southeast-1.aliyuncs.com/zeekrs/template:latest .
	docker push registry.ap-southeast-1.aliyuncs.com/zeekrs/template:latest
	kubectx dev.zeekrs
	kubectl rollout restart deployment template

generate:
	bun run db:generate

# add shadcn/ui component 
[working-directory: './packages/ui']
add component:
	pnpm dlx shadcn@latest add {{component}}
