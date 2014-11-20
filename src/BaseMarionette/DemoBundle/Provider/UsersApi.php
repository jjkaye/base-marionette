<?php

namespace BaseMarionette\DemoBundle\Provider;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class UsersApi implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app) {
            $em = $app['orm.em'];
            $repository = $em->getRepository('BaseMarionette\DemoBundle\Entity\User');
            $users = $repository->findAll();

            $response = new Response($app['serializer']->serialize($users, 'json'));
            $response->headers->set('content-type', 'application/json');
            return $response;
        });

        $controllers->delete('/{id}', function (Application $app, $id) {
            $em = $app['orm.em'];
            $repository = $em->getRepository('BaseMarionette\DemoBundle\Entity\User');
            $user = $repository->find($id);
            $em->remove($user);

            // Uncomment to actually delete
            // $em->flush();

            return new Response(null, 204);
        })
        ->assert('id', '\d+');

        return $controllers;
    }
}
