import boto3

s3 = boto3.resource("s3")

list_of_buckets = ["www.execyoution.com", "www.1min.me"]
input_message = "what's the name of the bucket?\n"
input_message += "Alternatively, pick from below list (by number):\n"
range_num_buckets = range(len(list_of_buckets))
list_of_tuples = list(zip(range_num_buckets, list_of_buckets))
list_of_strings = [f"{x[0]} - {x[1]}" for x in list_of_tuples]
input_message += "\n".join(list_of_strings)
input_message += "\n Your input: "
bucket_name = input(input_message)
if int(bucket_name) in range_num_buckets:
    bucket_name = list_of_buckets[int(bucket_name)]

bucket = s3.Bucket(bucket_name)
list_to_delete = []
names_to_delete = ""
for file_obj in bucket.objects.all():  # filter(Prefix=""):
    if "/" not in file_obj.key or file_obj.key.startswith("asset"):
        list_to_delete.append(file_obj)
        names_to_delete += f"{file_obj.key}\n"

for file_obj in list_to_delete:
    file_obj.delete()
