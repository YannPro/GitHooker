#sh /root/ymcf_deploy/ymcfinv_mainsv_deploy.sh


cd ../../test/cfinv/autoscripts
var=$(sh cfinv.sh)
echo $var

if [[ $var = *"Test Group Default SUCCEEDED"* ]]; then
  echo "TEST COMPLETE"
  # do notify
else
  echo "TEST FAILURE"

fi
