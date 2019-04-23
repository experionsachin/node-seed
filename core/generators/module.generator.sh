#!bash/sh

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
bold=$(tput bold)
normal=$(tput sgr0)
path="app"

if [ ! -d $path ]; then
	echo "${red}${bold}Error: '$path' folder not found"; exit 1;
fi

read -p "${green}${bold}Enter API version (if any): ${normal}" version
if [ "$version" ]; then
	case "$version" in  
		*\ *)
			echo "${red}${bold}Error: Whitespaces are not allowed in version"; exit 1;
		break;;
	esac	
	path="$path/$version";
	if [ ! -d $path ]; then
		echo "${red}${bold}Error: API version does not exist"; exit 1;
	fi
fi

read -p "${green}${bold}Enter module path (if any): ${normal}$path/" module_path
if [ "$module_path" ]; then
	case "$module_path" in  
		*\ *)
			echo "${red}${bold}Error: Whitespaces are not allowed in module path"; exit 1;
		break;;
	esac	
	path="$path/$module_path";
fi

read -p "${green}${bold}Enter module name: ${normal}" module_name
while [ ! "$module_name" ]
do
	echo "${red}${bold}Error: You must enter a module name";
	read -p "${green}${bold}Enter module name: ${normal}" module_name
done

case "$module_name" in  
	*\ *)
		echo "${red}${bold}Error: Whitespaces are not allowed in module name"; exit 1;
	break;;
esac

mkdir -p $path;
path="$path/$module_name";
if [ -d $path ]; then
	echo "${red}${bold}Error: Module already exists"; exit 1;
fi

mkdir $path;

touch "$path/$module_name.test.js";

cat >  "$path/$module_name.validator.js" <<-EOF
	const { body } = require('express-validator/check');
EOF

cat >  "$path/$module_name.router.js" <<-EOF

	const router = require('express').Router();
	const {  } = require('./$module_path.service');

	const routes = () => {
		
	};
	
	module.exports = { routes, path: '$module_path' };
EOF

cat >  "$path/$module_name.service.js" <<-EOF

	const list = async (req, res) => {
		return res.status(200).message('success').return([]);
	};

	module.exports = { list };
EOF
echo "\n${green}Created: $path/$module_name.router.js";
echo "${green}Created: $path/$module_name.service.js";
echo "${green}Created: $path/$module_name.test.js";
echo "${green}Created: $path/$module_name.validation.js\n";
echo "${red}Note: Need to add this module as a dependency in app.module.js\n";

echo "${green}${bold}----- Stop staring and start coding ;) ------\n";