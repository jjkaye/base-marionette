<?php

namespace BaseMarionette\DemoBundle\Fixtures;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use BaseMarionette\DemoBundle\Entity\User;

class UserFixture extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface
{
    const REF_FORMAT = 'user_%u';

    private static $users = [
        [
            'firstName' => 'george',
            'lastName' => 'bluth',
            'avatar' => 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
        ],
        [
            'firstName' => 'lucille',
            'lastName' => 'bluth',
            'avatar' => 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
        ],
        [
            'firstName' => 'oscar',
            'lastName' => 'bluth',
            'avatar' => 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg',
        ]
    ];

    public static function getRandRefStr()
    {
        return sprintf(self::REF_FORMAT, mt_rand(0, count(self::$users) - 1));
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        foreach (self::$users as $index => $userData) {
            $user = new User();
            foreach ($userData as $field => $value) {
                $setter = sprintf('set%s', ucfirst($field));
                $user->$setter($value);
            }
            $manager->persist($user);
            $this->addReference(sprintf(self::REF_FORMAT, $index), $user);
        }

        $manager->flush();
    }

    public function getOrder()
    {
        return 1;
    }
}
