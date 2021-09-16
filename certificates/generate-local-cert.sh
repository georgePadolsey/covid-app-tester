# Due to the application requiring camera access, when developing you need to be over https.
# Hence, you need to generate some fake https certificates for dev environment
# https://medium.com/responsetap-engineering/nextjs-https-for-a-local-dev-server-98bb441eabd7
#
# Any certificate generated from the below SHOULD NOT be used in production (and probably won't work!).
# On a production server, a standard https certificate should be used.

openssl req -x509 -out localhost.crt -keyout localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")