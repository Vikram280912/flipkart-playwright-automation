CREATE TABLE IF NOT EXISTS automation_runs (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 run_uuid CHAR(36) NOT NULL UNIQUE,
 feature_name VARCHAR(255) NOT NULL,
 scenario_name VARCHAR(255) NOT NULL,
 tags_json JSON NULL,
 browser_name VARCHAR(40) NOT NULL,
 status ENUM('PASSED','FAILED','SKIPPED','UNKNOWN') NOT NULL,
 duration_ms BIGINT NULL,
 error_summary TEXT NULL,
 started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 finished_at TIMESTAMP NULL,
 INDEX idx_runs_started(started_at), INDEX idx_runs_status(status)
);
CREATE TABLE IF NOT EXISTS observed_products (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 run_uuid CHAR(36) NOT NULL,
 search_keyword VARCHAR(255) NOT NULL,
 product_title TEXT NOT NULL,
 price_text VARCHAR(100) NULL,
 product_url TEXT NULL,
 observed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_products_run(run_uuid),
 CONSTRAINT fk_observed_run FOREIGN KEY(run_uuid) REFERENCES automation_runs(run_uuid)
);
CREATE TABLE IF NOT EXISTS api_evidence (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 run_uuid CHAR(36) NOT NULL,
 target_host VARCHAR(255) NOT NULL,
 endpoint_label VARCHAR(255) NOT NULL,
 http_method VARCHAR(12) NOT NULL,
 status_code INT NULL,
 duration_ms BIGINT NULL,
 outcome ENUM('PASS','FAIL','BLOCKED') NOT NULL,
 observed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 INDEX idx_api_run(run_uuid),
 CONSTRAINT fk_api_run FOREIGN KEY(run_uuid) REFERENCES automation_runs(run_uuid)
);