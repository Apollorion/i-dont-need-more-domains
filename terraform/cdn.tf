data "aws_route53_zone" "idnmd" {
  name = local.tld
}

brokeAF

module "cdn" {
  source  = "cloudposse/cloudfront-s3-cdn/aws"
  version = "0.40.0"

  aliases             = concat([local.tld, "www.${local.tld}"], local.acm_aliases)
  acm_certificate_arn = local.acm_cert
  allowed_methods     = ["HEAD", "GET"]
  name                = local.tld
  parent_zone_id      = data.aws_route53_zone.idnmd.zone_id
  dns_alias_enabled   = true
}

resource "aws_s3_bucket_object" "websitefiles" {
  count        = length(local.website_files)
  bucket       = module.cdn.s3_bucket
  key          = local.website_files[count.index]
  source       = "../idnmd/build/${local.website_files[count.index]}"
  content_type = local.extension_to_mime[split(".", local.website_files[count.index])[length(split(".", local.website_files[count.index])) - 1]]
  etag         = filemd5("../idnmd/build/${local.website_files[count.index]}")
}
