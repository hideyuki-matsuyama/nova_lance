# syntax=docker/dockerfile:1
# check=error=true

ARG RUBY_VERSION=3.4.4
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails_api

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
        build-essential \
        curl \
        git \
        libjemalloc2 \
        libpq-dev \
        libssl-dev \
        libvips \
        libxml2-dev \
        libxslt1-dev \
        libyaml-dev \
        pkg-config \
        postgresql-client \
        ruby-dev \
        zlib1g-dev \
    && rm -rf /var/lib/apt/lists /var/cache/apt/archives

ENV RAILS_ENV="production" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development test"

FROM base AS build

COPY Gemfile Gemfile.lock ./
RUN bundle config set --global frozen false && \
    bundle install --jobs $(nproc) --retry 3 && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

COPY . .

RUN bundle exec bootsnap precompile app/ lib/

FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails_api /rails_api

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash
RUN chown -R rails:rails /usr/local/bundle && \
    chown -R rails:rails db log storage tmp /rails_api
USER rails

ENTRYPOINT ["/rails_api/bin/docker-entrypoint"]

EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
