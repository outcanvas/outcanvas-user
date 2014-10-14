<?php

/*
  Plugin Name: Outcanvas User
  Plugin URI: https://github.com/outcanvas/outcanvas-user
  Description: Sign in, up, Membership, Roles and Capabilities.
  Version: 1.0.0
  GitHub Plugin URI: outcanvas/outcanvas-user
  GitHub Access Token: ac03ecc628840cf71af6f730bb664a0c712871e7
 */

class outcanvasUser {
	private static $instance = null;
	private $plugin_path;
	private $plugin_url;
    private $text_domain = 'outcanvas';

	/**
	 * Creates or returns an instance of this class.
	 */
	public static function get_instance() {
		// If an instance hasn't been created and set to $instance create an instance and set it to $instance.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Initializes the plugin by setting localization, hooks, filters, and administrative functions.
	 */
	private function __construct() {
		$this->plugin_path = plugin_dir_path( __FILE__ );
		$this->plugin_url  = plugin_dir_url( __FILE__ );

		load_plugin_textdomain( $this->text_domain, false, $this->plugin_path . '/lang' );

		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_styles' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_styles' ) );

		register_activation_hook( __FILE__, array( $this, 'activation' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivation' ) );

		$this->run_plugin();
	}

	public function get_plugin_url() {
		return $this->plugin_url;
	}

	public function get_plugin_path() {
		return $this->plugin_path;
	}

    /**
     * Place code that runs at plugin activation here.
     */
    public function activation() {

	}

    /**
     * Place code that runs at plugin deactivation here.
     */
    public function deactivation() {

	}

    /**
     * Enqueue and register JavaScript files here.
     */
    public function register_scripts() {

	}

    /**
     * Enqueue and register CSS files here.
     */
    public function register_styles() {

	}

    /**
     * Place code for your plugin's functionality here.
     */
    private function run_plugin() {

	}
}

outcanvasUser::get_instance();
