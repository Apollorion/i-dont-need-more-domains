provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "apollorion-us-east-1-tfstates"
    key    = "i-dont-need-more-domains.tfstate"
    region = "us-east-1"
  }
}

locals {
  prod_tld = "i-dont-need-more-domains.io"
  prod_cert = "arn:aws:acm:us-east-1:874575230586:certificate/52276146-910e-4e5c-947c-3c02a36b5444"

  stage_tld = "stage.i-dont-need-more-domains.io"
  stage_cert = "arn:aws:acm:us-east-1:874575230586:certificate/e414cda4-1c68-4c6c-8f10-06ab396e8546"

  tld           = terraform.workspace == "production" ? local.prod_tld : local.stage_tld
  acm_cert      = terraform.workspace == "production" ? local.prod_cert : local.stage_cert
  images        = fileset("../idnmd/src/memes/", "*")
  website_files = tolist(fileset("../idnmd/build/", "**"))

  acm_aliases = [for i in local.images : "${lower(split(".", i)[0])}.${local.tld}"]
}
