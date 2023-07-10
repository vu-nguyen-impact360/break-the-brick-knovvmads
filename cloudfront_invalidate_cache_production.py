import boto,os
conn = boto.connect_cloudfront(os.environ['AWS_ACCESS_KEY_ID'], os.environ['AWS_SECRET_ACCESS_KEY'])
folder_name = os.path.split(os.getcwd())[-1].replace("-knovvmads", "") # same as folder name
print "Invalidating files: "
paths = [
	'en/' + folder_name + '/index.html',
    'en/' + folder_name + '/game.js',
    'en/' + folder_name + '/promo.zip',
    'en/' + folder_name + '/media*', # Ensures the media assets are invalidated too
    'en/' + folder_name + '/branding*', # To ensure the branding files are also cleared
    'en/' + folder_name + '/sw.js'
    # Add more files
]
for path in paths:
	print path
inval_req = conn.create_invalidation_request(u'ETO18XGMMZM8A', paths)

print 'Cloudfront invalidation done ... please check again after 5 minutes'