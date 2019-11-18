"""
update html files post build
"""

from os import listdir
from os.path import isfile, join
from bs4 import BeautifulSoup

html_tag = r'<script data-widget-url="/wbot/index.html" src="/wbot/embed.js" defer async></script>'


base_dir = "C:\\Users\\Bassem\\Desktop\\working folder\\Tech\\static_site\\berbari.github.io\\build"
sub_dir = "TESTCO"  # "OMME"
template_folder = "template1"

dir_path = f"{base_dir}\\{sub_dir}\\{template_folder}"

unecessary_files = ["privacy-policy.html", "terms-of-service.html"]

# chdir(dir_path)
list_of_files = [
    f
    for f in listdir(dir_path)
    if isfile(join(dir_path, f)) and f not in unecessary_files
]


def add_script(soup):
    """ adds a specific script tag to an html bs4 file """
    new_script = soup.new_tag("script")
    new_script.attrs["data-widget-url"] = "/wbot/index.html"
    new_script.attrs["src"] = "/wbot/embed.js"
    new_script.attrs["defer"] = None
    new_script.attrs["async"] = None
    soup.body.append(new_script)
    return soup


for file_name in list_of_files:
    with open(join(dir_path, file_name), "r") as file:
        html = file.read()
        soup = BeautifulSoup(html, "html.parser")
        # list_of_scripts = soup.findAll("script")
        # print(len(list_of_scripts))
        # result = input("add script?")  #  {file_name}?[Y]")
        # if result in ['y','Y','yes']:
        soup = add_script(soup)
        list_of_scripts = soup.findAll("script")
        for script in list_of_scripts:
            print(script)

    with open(join(dir_path, file_name), "w", encoding="utf-8") as file:
        file.write(str(soup))
