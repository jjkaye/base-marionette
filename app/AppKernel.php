<?php

namespace BaseMarionette;

use BaseMarionette\DemoBundle\Provider as DemoBundleProvider;
use Doctrine\Common\Annotations\AnnotationRegistry;
use JMS\Serializer\SerializerBuilder;
use Silex\Application;
use Silex\Provider\TwigServiceProvider;

class AppKernel extends Application
{
    private $cacheDir;

    private static $dbConfig = [
        'host' => null,
        'charset' => 'utf8',
        'driver' => 'pdo_mysql',
    ];

    public function __construct(array $values = array())
    {
        parent::__construct($values);
        $this->cacheDir = __DIR__ . '/cache';
        $this->registerProviders();
        $this->registerRoutes();
    }

    private function registerProviders()
    {
        $this->register(
            new \Igorw\Silex\ConfigServiceProvider(__DIR__ . '/config/config.yml')
        );

        $this->register(
            new \Igorw\Silex\ConfigServiceProvider(__DIR__ . '/config/env.yml')
        );

        $this->register(
            new \Silex\Provider\DoctrineServiceProvider(),
            [
                'db.options' => array_merge(
                    self::$dbConfig,
                    $this['db']
                ),
            ]
        );

        $this->register(
            new \Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider,
            array(
                'orm.auto_generate_proxies' => true,
                'orm.proxies_dir' => $this->cacheDir . '/proxies',
                'orm.em.options' => array(
                    'mappings' => array(
                        array(
                            'type' => 'annotation',
                            'namespace' => 'BaseMarionette\\DemoBundle\\Entity',
                            'path' => __DIR__ . '/../src/BaseMarionette/DemoBundle/Entity',
                        ),
                    ),
                ),
            )
        );

        // -- The automatic PSR handler in composer, or SPL isn't going to cut it for
        //    loading JMS annotations since they use Doctrine's autoloading. We'll need
        //    to explicitly register the namespace.
        AnnotationRegistry::registerAutoloadNamespace(
            'JMS\Serializer\Annotation',
            __DIR__ . "/../vendor/jms/serializer/src"
        );

        $this['serializer'] = SerializerBuilder::create()
            ->setCacheDir($this->cacheDir . '/serializer')
            ->build()
        ;

        $this->register(new TwigServiceProvider(), array(
            'twig.path' => __DIR__ . '/../web'
        ));
    }

    private function registerRoutes()
    {
        $this->get('/', function (Application $app) {
            return $app['twig']->render('index.html');
        });
        $this->mount('/api/users', new DemoBundleProvider\UsersApi());
    }
}
