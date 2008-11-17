class LightboxGenerator < Rails::Generator::Base 
  def manifest
    record do |m|
      m.asset 'MooTools 1.2.1', 'mootools_1.2.1', 'javascripts'
    end
  end
end