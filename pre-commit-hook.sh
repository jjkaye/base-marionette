#!/bin/bash

EXIT_PHPCS_NO_BIN=1
EXIT_PHPCS_ERROR=2
EXIT_PHP_LINT_ERROR=3
EXIT_JSHINT_NO_BIN=4
EXIT_JSHINT_ERROR=5
EXIT_IMAGEOPTIM_NO_BIN=6
EXIT_IMAGEOPTIM_FOUND_OPT=7
EXIT_GRUNT_VALIDATE_CODE_ERROR=8

function pre_exit {
    git stash pop --quiet --index
}

function error {
    echo -e "\n\n== ERROR: $1\n"
    pre_exit
    exit $2
}

function check_phpcs {
    local ret=0
    PHP_FILES="`echo -e \"${FILES_MODIFIED}\n${FILES_ADDED}\" | grep '\.php$'`"
    if [ -n "$PHP_FILES" ]; then

        #-- Make sure they have PHP_CodeSniffer installed
        if [ ! `which phpcs` ]; then
            error "could not find phpcs.  See http://pear.php.net/package/PHP_CodeSniffer" $EXIT_PHPCS_NO_BIN
        fi

        echo -e "== Running PHP_CodeSniffer on the following files:\n$PHP_FILES\n"

        for f in $PHP_FILES; do
            phpcs -n --standard=PSR2 $f
            if [ 0 -ne $? ]; then
                ret=1
            fi
        done
        if [ 0 -ne $ret ]; then
            error "You have PHP errors!" $EXIT_PHPCS_ERROR
        fi
    fi
}

function check_phplint {
    local ret=0
    PHP_FILES="`echo -e \"${FILES_MODIFIED}\n${FILES_ADDED}\" | grep '\.php$'`"
    if [ -n "$PHP_FILES" ]; then

        echo -e "== Running php -l on the following files:\n$PHP_FILES\n"
        for f in $PHP_FILES; do
            php -l $f | grep -v 'No syntax errors detected in'
            if [ 0 -eq $? ]; then
                ret=1
            fi
        done
        if [ 0 -ne $ret ]; then
            error "You have PHP syntax errors!" $EXIT_PHP_LINT_ERROR
        fi
    fi
}

function check_grunt {
    output=`grunt validate-code`
    ret=$?

    if [ 0 -ne $ret ]; then
        grunt validate-code
        error "You have JavaScript errors. Commit aborted." $EXIT_GRUNT_VALIDATE_CODE_ERROR
    fi
}


#-----------------#
#   SCRIPT CODE   #
#-----------------#
#-- CD to the root git dir
cd "`dirname $0`/../.."

#-- Stash all changes so we can check what we are actually committing
git stash --include-untracked --keep-index -q

FILES_ADDED="`git diff --cached --name-only --diff-filter=M`"
FILES_MODIFIED="`git diff --cached --name-only --diff-filter=A`"
FILES_DELETED="`git diff --cached --name-only --diff-filter=D`"

check_phplint
check_phpcs
check_grunt

pre_exit
