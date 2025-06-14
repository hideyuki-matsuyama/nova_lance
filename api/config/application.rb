require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.after_initialize do
      ActionController::API.include(Devise::Controllers::Helpers)
    end

    config.middleware.use Warden::Manager do |manager|
      manager.default_strategies(:user).unshift :jwt
      # 認証失敗時のJSONレスポンスを返すカスタム`failure_app`を設定することもできます
      manager.failure_app = ->(env){ [401, {'Content-Tyape' => 'application/json'}, [{error: 'Unauthorized'}.to_json]] }
    end

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*" # 本番では特定のドメインを指定
        resource "*",
          headers: :any,
          methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
          expose: [ "Authorization" ] # JWT認証のためにAuthorizationヘッダーを公開
      end
    end

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end

Rails.application.config.i18n.default_locale = :ja
Faker::Config.locale = :ja
